import Form from '@/app/(components)/common/form';
import Footer from '@/app/(components)/common/footer';
import { FormProvider } from '@/app/(components)/formProvider';
import ScrTop from '../components/scrTop';

// 8. 마지막 상담 (M8): 코발트 둥근 판 + 신청 폼, 오른쪽 휴대폰(시작 화면 → 신청 입력 → 완료) + 바닥글
const Section8 = () => {
    return (
        <section className="section final" id="consult">
            <div className="container">
                <div className="cta-panel">
                    <div className="reveal">
                        <h2 className="s-title">
                            나에게 맞는 해결 방법
                            <br />
                            지금 <span className="blue">무료로</span> 상담받아 보세요
                        </h2>
                        <FormProvider inquireLocation="마지막 섹션">
                            <Form />
                        </FormProvider>
                    </div>
                    <div className="phone fphone reveal" data-demo="apply" aria-hidden="true">
                        <div className="scr-wrap">
                            <div className="scr a f-splash">
                                <span className="f-dot"></span>
                                <img src="/assets/icons/scale.svg" alt="" />
                                <b>채움회생</b>
                                <small>개인회생 · 파산 상담</small>
                            </div>
                            <div className="scr b">
                                <ScrTop />
                                <p className="scr-h">무료 상담 신청</p>
                                <div className="f-field" data-type="홍길동">
                                    <small>이름</small>
                                    <b>홍길동</b>
                                </div>
                                <div className="f-field" data-type="010-1234-5678">
                                    <small>전화번호 (예시)</small>
                                    <b>010-1234-5678</b>
                                </div>
                                <div className="f-agree on">
                                    <i></i>개인정보 수집·이용 동의
                                </div>
                                <div className="scr-btn">상담 신청하기</div>
                            </div>
                            <div className="scr c f-done">
                                <img src="/assets/icons/check.svg" alt="" />
                                <b>상담 신청이 완료됐어요</b>
                                <small>곧 상담 전화를 드릴게요</small>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </section>
    );
};

export default Section8;
