// 랜딩 움직임 (원본 시안 스크립트 M1–M9 그대로 옮김)
// 화면에 보일 때만 진행. 움직임 줄이기 설정이면 html.motion 이 없어서 글자 등장(M9)만 바로 보임

type El = HTMLElement;
const $ = (s: string, r: ParentNode = document) => r.querySelector(s) as El;
const $$ = (s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as El[];
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function startLandingMotion() {
    const MOTION = document.documentElement.classList.contains('motion');

    // 화면에 보일 때만 진행
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
        { threshold: 0.2 }
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
        { threshold: 0.15 }
    );
    $$('.reveal').forEach((el) => revealIO.observe(el));

    if (!MOTION) return;

    // ── M1 첫 화면: 반원 → 덩어리 → 화면을 휩쓰는 큰 모양 → 반원 → 공 → 알약 → 3D 저울 (5.3초, 1회) ──
    const morph = $('.morph');
    const stage = $('.hero-stage');
    const cta = $('.hero-cta');
    const img = $('.hero-3d');
    const startHero = () => {
        const k = stage.offsetWidth / 200; // 모바일은 작게
        const lift =
            stage.getBoundingClientRect().top +
            stage.offsetHeight / 2 -
            (cta.getBoundingClientRect().top + cta.offsetHeight / 2);
        const half = cta.offsetHeight / 2;
        // w,h: 크기 / cy: 버튼 가운데 기준 세로 중심 / r: 모서리 / rot: 기울기 / hue: 색 돌리기
        const shape = (o: number, w: number, h: number, r: string, cy: number, rot = 0, op = 1, hue = 0) => ({
            offset: o,
            width: `${w * k}px`,
            height: `${h * k}px`,
            borderRadius: r,
            transform: `translate(${(-w * k) / 2}px, ${cy - (h * k) / 2}px) rotate(${rot}deg)`,
            opacity: op,
            filter: `hue-rotate(${hue}deg) blur(${h > 600 ? 0 : 1}px)`,
        });
        const dome = (o: number, w: number, h: number, rot = 0) =>
            shape(o, w, h, `${(w * k) / 2}px ${(w * k) / 2}px ${8 * k}px ${8 * k}px`, half - (h * k) / 2, rot);
        const ease = 'cubic-bezier(.65, 0, .35, 1)';
        const frames = [
            { ...dome(0, 150, 0), opacity: 1 },
            dome(0.13, 170, 90),
            { ...shape(0.25, 210, 230, `${105 * k}px ${105 * k}px ${26 * k}px ${26 * k}px`, half - 115 * k, -6) },
            { ...shape(0.38, 1500, 1200, `${750 * k}px ${750 * k}px ${90 * k}px ${90 * k}px`, half - 360 * k, -24) },
            dome(0.49, 250, 125),
            shape(0.62, 110, 110, '50%', lift),
            shape(0.75, 66, 120, `${33 * k}px`, lift, -28, 1, -24),
            shape(0.83, 46, 84, `${23 * k}px`, lift, -28, 0, -24),
            shape(1, 46, 84, `${23 * k}px`, lift, -28, 0, -24),
        ].map((f) => ({ ...f, easing: ease }));
        morph.animate(frames, { duration: 5300, fill: 'forwards' });
        img.animate(
            [
                { opacity: 0, transform: 'scale(.3) rotate(-10deg)' },
                { opacity: 1, transform: 'scale(1.12) rotate(4deg)', offset: 0.6 },
                { opacity: 1, transform: 'none' },
            ],
            { duration: 800, delay: 4250, fill: 'forwards', easing: 'cubic-bezier(.22, 1, .36, 1)' }
        ).finished.then(() => {
            img.style.opacity = '1';
            img.classList.add('is-bob');
        });
        setTimeout(() => $('.chev').classList.add('is-on'), 3300);
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(startHero));

    // ── M3 맞춤형 해결 방법: 구슬 → 알림 카드 펼침 → 3초마다 새 카드가 맨 위에 생기고 이전 카드는 한 칸씩 아래로 ──
    const notice = $('[data-notice]');
    const tpl = $$('.notice-card', notice).map((c) => c.cloneNode(true) as El); // 나오는 순서
    const stack = $$('.notice-card', notice);
    stack.splice(1).forEach((c) => c.remove()); // 처음엔 첫 카드만
    let mi = 0;
    play(
        notice,
        async () => {
            await sleep(300);
            notice.classList.replace('st0', 'st1'); // 구슬
            await sleep(1300);
            notice.classList.replace('st1', 'st2'); // 카드로 펼쳐짐
            await sleep(900);
            notice.classList.remove('st2'); // 문구·물체 등장
            await sleep(600);
        },
        async () => {
            await wait(notice, 3000);
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
        await wait(ph, 700);
        nums.forEach((n) => countUp(n, 1300));
        barI.style.width = barI.dataset.w!;
        await wait(ph, 2200);
        roll2(ph, 1);
        await wait(ph, 1700);
        chips(ph, 1);
        await wait(ph, 1700);
        const cells = $$('.months i', ph);
        const pc = $('[data-paid-count]', ph);
        cells.forEach((c) => c.classList.remove('on', 'now', 'pop'));
        pc.textContent = '0';
        listScroll(ph, false);
        ph.classList.add('on-b');
        await wait(ph, 700);
        for (let i = 0; i < 12; i++) {
            cells[i].classList.add('on', 'pop');
            setTimeout(() => cells[i].classList.remove('pop'), 250);
            pc.textContent = String(i + 1);
            await sleep(110);
        }
        cells[12].classList.add('now');
        await wait(ph, 500);
        listScroll(ph, true);
        await wait(ph, 3200);
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
        await wait(ph, 700);
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.width = bars[i].dataset.w!;
            countUp(nums[i], 900);
            await sleep(600);
        }
        await wait(ph, 700);
        hl.classList.add('is-hl');
        await wait(ph, 1600);
        chips(ph, 1);
        await wait(ph, 1700);
        listScroll(ph, false);
        ph.classList.add('on-b');
        await wait(ph, 900);
        listScroll(ph, true);
        await wait(ph, 3600);
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
        await wait(ph, 800);
        for (const li of items) {
            li.classList.add('done');
            await sleep(650);
        }
        await wait(ph, 300);
        result.classList.remove('hide');
        await wait(ph, 2400);
        noTransition(bubbles, () => bubbles.forEach((b) => b.classList.add('hide')));
        ph.classList.add('on-b');
        await wait(ph, 700);
        for (const b of bubbles) {
            b.classList.remove('hide');
            await sleep(900);
        }
        await wait(ph, 2600);
    });

    // ── M5 카드가 하나씩 튀어나오며 그래프가 0부터 차오름 (3.3초 간격) ──
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
        steps: async (c) => {
            const st = $$('.a-steps span', c);
            c.dataset.on ??= String(st.filter((s) => s.classList.contains('on')).length);
            st.forEach((s) => s.classList.remove('on'));
            await sleep(300);
            for (const s of st.slice(0, +c.dataset.on)) {
                s.classList.add('on');
                await sleep(400);
            }
        },
        progress: async (c) => {
            const i = $('.a-progress i', c);
            noTransition([i], () => (i.style.width = '0'));
            await sleep(250);
            i.style.width = i.dataset.w!;
        },
    };
    play(fan, null, async () => {
        if (ci >= 0) charts[ci].classList.remove('is-pop');
        ci = (ci + 1) % charts.length;
        const c = charts[ci];
        c.classList.add('is-pop');
        fill[c.dataset.chart!](c);
        await wait(fan, 3300);
    });

    // ── M6 서류 준비: 휴대폰 캐러셀 + 제목 단어가 맞춰 굴러 바뀜, 배경색 1초 전환 ──
    const docs = $('[data-docs]');
    const deck = $('.deck', docs);
    const dps = $$('.dphone', deck);
    const track = $('.roll-track', docs);
    const word = $('[data-roll]', docs);
    const n = dps.length;
    let di = 0;
    // 글꼴·스타일이 다 적용된 뒤에 재야 정확함 (개발 모드는 CSS가 늦게 붙음)
    const fitWord = () => {
        word.style.width = '';
        word.style.width = Math.max(...$$('span', track).map((s) => s.scrollWidth)) + 'px';
    };
    fitWord();
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fitWord);
    window.addEventListener('load', fitWord);
    window.addEventListener('resize', fitWord);
    const setPos = () =>
        dps.forEach((p, i) => {
            const d = (i - di + n) % n;
            p.dataset.pos = d === n - 1 ? 'L' : String(d);
        });
    play(
        docs,
        async () => {
            docs.classList.add('is-active');
            await sleep(900);
            deck.classList.remove('st0');
            await sleep(600);
        },
        async () => {
            await wait(docs, 2200);
            di += 1;
            track.style.transform = `translateY(${(-di * 100) / (n + 1)}%)`;
            if (di === n) {
                di = 0;
                setTimeout(() => noTransition([track], () => (track.style.transform = '')), 650);
            }
            setPos();
        }
    );

    // ── M7 채움과 함께하면: 한 장 먼저 → 줄지어 왼쪽으로 흐름 (2.4초에 한 칸), 넘어가는 카드는 흐려짐 ──
    const flow = $('[data-flow]');
    const ftrack = $('.flow-track', flow);
    play(
        flow,
        async () => {
            await sleep(200);
            flow.classList.remove('st00');
            await sleep(1300);
            flow.classList.remove('st0');
            await sleep(1200);
        },
        async () => {
            await wait(flow, 2400);
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
        await wait(ph, 300);
        dot.classList.add('is-bounce');
        await sleep(900);
        dot.classList.remove('is-bounce');
        splash.classList.remove('pre');
        await wait(ph, 1600);
        ph.classList.add('on-b');
        await wait(ph, 700);
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
        await wait(ph, 2800);
    });
}
