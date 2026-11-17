// 랜딩 움직임 M1–M9 (원본 시안 2 스크립트를 그대로 옮김)
// 화면에 보일 때만 진행. 움직임 줄이기 설정이면 html.motion 이 없어서 글자 등장(M9)만 바로 보임

type El = HTMLElement;
const $ = (s: string, r: ParentNode = document) => r.querySelector(s) as El;
const $$ = (s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as El[];
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function startLandingMotion() {
    const MOTION = document.documentElement.classList.contains('motion');

    // 화면에 보일 때만 진행 (화면 밖으로 나가면 멈췄다가 다시 보이면 이어서)
    const seen = new WeakMap<Element, boolean>();
    const waiting = new Map<Element, (() => void)[]>();
    const visIO = new IntersectionObserver(
        (entries) =>
            entries.forEach((e) => {
                seen.set(e.target, e.isIntersecting);
                if (e.isIntersecting && waiting.has(e.target)) {
                    waiting.get(e.target)!.forEach((r) => r());
                    waiting.delete(e.target);
                }
            }),
        { threshold: 0.05 }
    );
    const whenVisible = (el: Element) =>
        seen.get(el)
            ? Promise.resolve()
            : new Promise<void>((r) => {
                  if (!waiting.has(el)) waiting.set(el, []);
                  waiting.get(el)!.push(r);
              });
    const wait = async (el: Element, ms: number) => {
        await sleep(ms);
        await whenVisible(el);
    };
    function play(el: El | null, intro: (() => Promise<void>) | null, loop: (() => Promise<void>) | null) {
        if (!MOTION || !el) return;
        visIO.observe(el);
        (async () => {
            await whenVisible(el);
            if (intro) await intro();
            if (loop)
                for (;;) {
                    await loop();
                    await whenVisible(el);
                }
        })();
    }

    // 숫자 올라가기
    const fmt = (el: El, v: number) => {
        el.textContent = (el.dataset.prefix || '') + v.toLocaleString('ko-KR') + (el.dataset.suffix || '');
    };
    const zero = (el: El) => fmt(el, 0);
    function countUp(el: El, ms = 1100) {
        const to = +el.dataset.count!;
        const t0 = performance.now();
        return new Promise<void>((res) => {
            const f = (t: number) => {
                const p = Math.min(1, (t - t0) / ms);
                fmt(el, Math.round(to * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(f);
                else res();
            };
            requestAnimationFrame(f);
        });
    }
    // CSS 변수 숫자 바꾸기 (도넛·링)
    function tweenVar(el: El, name: string, to: number, ms = 1100) {
        const t0 = performance.now();
        return new Promise<void>((res) => {
            const f = (t: number) => {
                const p = Math.min(1, (t - t0) / ms);
                el.style.setProperty(name, (to * (1 - Math.pow(1 - p, 3))).toFixed(1));
                if (p < 1) requestAnimationFrame(f);
                else res();
            };
            requestAnimationFrame(f);
        });
    }
    const noTransition = (els: El[], fn: () => void) => {
        els.forEach((e) => (e.style.transition = 'none'));
        fn();
        els.forEach((e) => e.offsetWidth);
        els.forEach((e) => (e.style.transition = ''));
    };

    // 섹션 글자 등장 (M9)
    const revealIO = new IntersectionObserver(
        (entries) =>
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-in');
                    revealIO.unobserve(e.target);
                }
            }),
        { threshold: 0.05 }
    );
    $$('.reveal').forEach((el) => revealIO.observe(el));

    if (!MOTION) return;

    // ── M1 첫 화면 배경 영상: 화면에 보일 때만 재생, 벗어나면 멈춤 (글자는 M9 등장 효과로 올라옴) ──
    const heroVideo = $('.hero-video') as HTMLVideoElement | null;
    if (heroVideo) {
        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) heroVideo.play().catch(() => {});
            else heroVideo.pause();
        }).observe(heroVideo);
    }
    // ── M2 아래 화살표: 글자가 다 올라온 뒤 깜빡이기 시작 ──
    setTimeout(() => $('.chev')?.classList.add('is-on'), 800);

    // ── M3 맞춤형 해결 방법: 구슬 → 알림 카드 펼침 → 새 카드가 맨 위에 생기고 이전 카드는 한 칸씩 아래로 ──
    const notice = $('[data-notice]');
    const tpl = $$('.notice-card', notice).map((c) => c.cloneNode(true) as El); // 나오는 순서
    const stack = $$('.notice-card', notice);
    stack.splice(1).forEach((c) => c.remove()); // 처음엔 첫 카드만
    let mi = 0;
    play(
        notice,
        async () => {
            await sleep(100);
            notice.classList.replace('st0', 'st1'); // 구슬
            await sleep(700);
            notice.classList.replace('st1', 'st2'); // 카드로 펼쳐짐
            await sleep(600);
            notice.classList.remove('st2'); // 문구·물체 등장
            await sleep(300);
        },
        async () => {
            await wait(notice, 2200);
            mi = (mi + 1) % tpl.length;
            const card = tpl[mi].cloneNode(true) as El;
            card.dataset.slot = 'new';
            notice.appendChild(card);
            void card.offsetWidth; // 시작 상태를 먼저 그리고 나서 이동
            stack.unshift(card);
            stack.forEach((c, i) => (c.dataset.slot = String(i)));
            const gone = stack.splice(4);
            setTimeout(() => gone.forEach((c) => c.remove()), 1000);
        }
    );

    // ── M4 휴대폰 안 앱 동작 ──
    const roll2 = (ph: El, n: number) => {
        $('.roll2-track', ph).style.transform = `translateY(${(-n * 100) / 2}%)`;
    };
    const chips = (ph: El, n: number) => {
        const t = $('.scr-chips-track', ph);
        if (t)
            t.style.transform = n
                ? `translateX(-${(t.children[0] as El).offsetWidth + (t.children[1] as El).offsetWidth + 10}px)`
                : '';
    };
    const listScroll = (ph: El, on: boolean) => {
        const ul = $('.scr.b .scr-list ul', ph);
        if (!ul) return;
        if (on) {
            const box = ul.parentElement!;
            ul.style.transform = `translateY(${-Math.max(0, ul.scrollHeight - box.clientHeight)}px)`;
        } else noTransition([ul], () => (ul.style.transform = ''));
    };

    const salary = $('[data-demo="salary"]');
    play(salary, null, async () => {
        const ph = salary;
        const nums = $$('.scr.a [data-count]', ph);
        const barI = $('.scr.a [data-w]', ph);
        ph.classList.remove('on-b');
        noTransition([barI, $('.roll2-track', ph), $('.scr-chips-track', ph)], () => {
            nums.forEach(zero);
            barI.style.width = '0';
            roll2(ph, 0);
            chips(ph, 0);
        });
        await wait(ph, 250);
        nums.forEach((n) => countUp(n, 1000));
        barI.style.width = barI.dataset.w!;
        await wait(ph, 1600);
        roll2(ph, 1);
        await wait(ph, 1300);
        chips(ph, 1);
        await wait(ph, 1300);
        const cells = $$('.months i', ph);
        const pc = $('[data-paid-count]', ph);
        cells.forEach((c) => c.classList.remove('on', 'now', 'pop'));
        pc.textContent = '0';
        listScroll(ph, false);
        ph.classList.add('on-b');
        await wait(ph, 500);
        for (let i = 0; i < 12; i++) {
            cells[i].classList.add('on', 'pop');
            setTimeout(() => cells[i].classList.remove('pop'), 250);
            pc.textContent = String(i + 1);
            await sleep(110);
        }
        cells[12].classList.add('now');
        await wait(ph, 400);
        listScroll(ph, true);
        await wait(ph, 2600);
    });

    const business = $('[data-demo="business"]');
    play(business, null, async () => {
        const ph = business;
        const bars = $$('.scr.a .scr-bars i', ph);
        const nums = $$('.scr.a .scr-bars [data-count]', ph);
        const hl = $('[data-hl]', ph);
        ph.classList.remove('on-b');
        hl.classList.remove('is-hl');
        noTransition([...bars, $('.scr-chips-track', ph)], () => {
            bars.forEach((b) => (b.style.width = '0'));
            nums.forEach(zero);
            chips(ph, 0);
        });
        await wait(ph, 250);
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.width = bars[i].dataset.w!;
            countUp(nums[i], 800);
            await sleep(450);
        }
        await wait(ph, 500);
        hl.classList.add('is-hl');
        await wait(ph, 1200);
        chips(ph, 1);
        await wait(ph, 1300);
        listScroll(ph, false);
        ph.classList.add('on-b');
        await wait(ph, 700);
        listScroll(ph, true);
        await wait(ph, 2800);
    });

    const check = $('[data-demo="check"]');
    play(check, null, async () => {
        const ph = check;
        const items = $$('.scr.a .scr-check li', ph).slice(0, 3);
        const result = $('.scr-result', ph);
        const bubbles = $$('.scr.b .scr-bubble', ph);
        ph.classList.remove('on-b');
        noTransition([result], () => {
            items.forEach((li) => li.classList.remove('done'));
            result.classList.add('hide');
        });
        await wait(ph, 250);
        for (const li of items) {
            li.classList.add('done');
            await sleep(500);
        }
        await wait(ph, 250);
        result.classList.remove('hide');
        await wait(ph, 1800);
        noTransition(bubbles, () => bubbles.forEach((b) => b.classList.add('hide')));
        ph.classList.add('on-b');
        await wait(ph, 500);
        for (const b of bubbles) {
            b.classList.remove('hide');
            await sleep(700);
        }
        await wait(ph, 2000);
    });

    // ── M5 카드가 하나씩 튀어나오며 그래프가 0부터 차오름 ──
    const fan = $('[data-fan]');
    const charts = $$('.acard[data-chart]', fan);
    let ci = -1;
    const fill: Record<string, (c: El) => Promise<void>> = {
        bars: async (c) => {
            const b = $$('.mini-bars i', c);
            noTransition(b, () => b.forEach((i) => (i.style.height = '0')));
            await sleep(250);
            b.forEach((i, n) => setTimeout(() => (i.style.height = i.dataset.h!), n * 250));
        },
        donut: async (c) => {
            const d = $('.donut', c);
            d.style.setProperty('--p', '0');
            await sleep(250);
            tweenVar(d, '--p', +d.dataset.p!, 1200);
        },
        ring: async (c) => {
            const r = $('.ring', c);
            const s = $('span', r);
            r.style.setProperty('--p', '0');
            zero(s);
            await sleep(250);
            tweenVar(r, '--p', +r.dataset.p!, 1200);
            countUp(s, 1200);
        },
        // 신청부터 한 칸씩: 지난 단계는 체크, 선이 다음 점까지 차오름, 마지막(변제)은 "지금 단계"
        steps: async (c) => {
            const ol = $('.a-steps', c);
            const st = $$('li', ol);
            const set = (m: number) => {
                st.forEach((s, i) => {
                    s.classList.toggle('on', i < m);
                    s.classList.toggle('now', i === m);
                });
                ol.style.setProperty('--n', String(m));
            };
            ol.classList.add('reset');
            set(0);
            void ol.offsetWidth;
            ol.classList.remove('reset');
            for (let m = 1; m < st.length; m++) {
                await sleep(450);
                set(m);
            }
        },
        // 서류 5장이 차례로 체크됨
        docs: async (c) => {
            const d = $$('.a-docs li', c);
            noTransition($$('.a-doc', c), () => d.forEach((li) => li.classList.remove('on')));
            await sleep(300);
            for (const li of d) {
                li.classList.add('on');
                await sleep(170);
            }
        },
    };
    play(fan, null, async () => {
        if (ci >= 0) charts[ci].classList.remove('is-pop');
        ci = (ci + 1) % charts.length;
        const c = charts[ci];
        c.classList.add('is-pop');
        fill[c.dataset.chart!](c);
        await wait(fan, 2300);
    });

    // ── M6 서류 준비: 휴대폰 캐러셀 + 제목 단어가 맞춰 굴러 바뀜, 배경색 1초 전환 ──
    const docs = $('[data-docs]');
    const deck = $('.deck', docs);
    const dps = $$('.dphone', deck);
    const track = $('.roll-track', docs);
    const n = dps.length;
    let di = 0;
    // 굴러 바뀌는 단어 칸의 폭은 가장 긴 단어에 맞춰 CSS가 저절로 정함 (JS로 재지 않음)
    const setPos = () =>
        dps.forEach((p, i) => {
            const d = (i - di + n) % n;
            p.dataset.pos = d === n - 1 ? 'L' : String(d);
        });
    play(
        docs,
        async () => {
            docs.classList.add('is-active');
            await sleep(300);
            deck.classList.remove('st0');
            await sleep(300);
        },
        async () => {
            await wait(docs, 1800);
            di += 1;
            track.style.transform = `translateY(${(-di * 100) / (n + 1)}%)`;
            if (di === n) {
                di = 0;
                setTimeout(() => noTransition([track], () => (track.style.transform = '')), 650);
            }
            setPos();
        }
    );

    // ── M7 채움과 함께하면: 한 장 먼저 → 줄지어 왼쪽으로 흐름, 넘어가는 카드는 흐려짐 ──
    const flow = $('[data-flow]');
    const ftrack = $('.flow-track', flow);
    play(
        flow,
        async () => {
            await sleep(100);
            flow.classList.remove('st00');
            await sleep(800);
            flow.classList.remove('st0');
            await sleep(800);
        },
        async () => {
            await wait(flow, 2000);
            if (flow.matches(':hover')) return;
            const first = ftrack.firstElementChild as El;
            const step = first.offsetWidth + parseFloat(getComputedStyle(ftrack).gap);
            first.classList.add('is-leaving');
            ftrack.style.transition = 'transform .9s cubic-bezier(.65, 0, .35, 1)';
            ftrack.style.transform = `translateX(${-step}px)`;
            await sleep(950);
            noTransition([ftrack, first], () => {
                ftrack.appendChild(first);
                ftrack.style.transform = '';
                first.classList.remove('is-leaving');
            });
        }
    );

    // ── M8 마지막 상담 휴대폰: 점이 튀어 저울로 → 이름·번호가 한 글자씩 입력 → 버튼 → 완료 ──
    const apply = $('[data-demo="apply"]');
    play(apply, null, async () => {
        const ph = apply;
        const splash = $('.f-splash', ph);
        const dot = $('.f-dot', ph);
        const fields = $$('.f-field', ph);
        const agree = $('.f-agree', ph);
        const btn = $('.scr.b .scr-btn', ph);
        ph.classList.remove('on-b', 'on-c');
        splash.classList.add('pre');
        dot.classList.remove('is-bounce');
        void dot.offsetWidth;
        fields.forEach((f) => {
            $('b', f).textContent = '';
            f.classList.remove('is-typing');
        });
        agree.classList.remove('on');
        await wait(ph, 100);
        dot.classList.add('is-bounce');
        await sleep(900);
        dot.classList.remove('is-bounce');
        splash.classList.remove('pre');
        await wait(ph, 1000);
        ph.classList.add('on-b');
        await wait(ph, 500);
        for (const f of fields) {
            f.classList.add('is-typing');
            const b = $('b', f);
            const text = f.dataset.type!;
            for (const ch of text) {
                b.textContent += ch;
                await sleep(text.length > 5 ? 70 : 150);
            }
            await sleep(250);
            f.classList.remove('is-typing');
        }
        agree.classList.add('on');
        await wait(ph, 500);
        btn.classList.add('is-press');
        await sleep(180);
        btn.classList.remove('is-press');
        await wait(ph, 400);
        ph.classList.replace('on-b', 'on-c');
        await wait(ph, 2200);
    });
}
