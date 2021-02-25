import React, {useEffect, useState, useRef} from 'react';
import WebLayout from '../../app/layout/webLayout';
import HomeUsecaseTab, {HomeUsecaseTabComponent} from "./homeUsecaseTab";
import HomeUsecaseCompany from "./usecaseTabComponent/company";
import HomeUsecaseSmallLibrary from "./usecaseTabComponent/smallLibrary";
import HomeUsecasePersonal from "./usecaseTabComponent/personal";
import HomeUsecaseBigLibrary from "./usecaseTabComponent/bigLibrary";
import img_1 from '../../../assets/img/landing_img_1.png';
import img_2 from '../../../assets/img/landing_img_2.png';
import landingShape from '../../../assets/img/landing_main_shape.svg';
import AnimationWrap from "./sectionWrap";

function Home() {
  const [windowOffset, setWindowOffset] = useState(0);

  useEffect(() => {
    function testScroll() {
      // const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // console.log(document.documentElement.scrollTop);
    }

    // testScroll();
    window.addEventListener("scroll", testScroll);

    // return () => testScroll()
    return () => window.removeEventListener("scroll", testScroll);

  }, []);


  return (
    <WebLayout>
      <section className="mainSec">
        <div className="homeMainSec">
          <div className="homeMainContentSec">
            <AnimationWrap>
              <h1><strong>세상에 없던 독서 경험</strong></h1>
            </AnimationWrap>
            <AnimationWrap delay={0.3}>
              <h2>우리 회사 도서 관리</h2>
            </AnimationWrap>
            <AnimationWrap delay={0.6}>
              <h3 className="space-6x">내 컴퓨터 안의 서재</h3>
            </AnimationWrap>
            <AnimationWrap delay={1.2}>
              <h4><strong>모두, 여기서.</strong></h4>
            </AnimationWrap>
          </div>
          <div className="homeShapeImg">
            <img src={landingShape} alt=""/>
          </div>

        </div>
      </section>

      <section className="landingLayout">
       <AnimationWrap>
         <div className="subAlertSec">
           지원 예정입니다. 조금만 기다려 주세요!
         </div>
       </AnimationWrap>
      </section>


      <section className="landingLayout">
        <div className="homeInfoGrid">
          <AnimationWrap>
            <div className="imgSec">
              <div style={{backgroundImage: `url(${img_1})`}} className="landingImg"/>
            </div>
          </AnimationWrap>

          <div>
            <AnimationWrap delay={0.3}>
              <h3 className="space-4x">
                <strong>
                  그러니까... <br/>
                  구축하지 않고,<br/>
                  가입 한 번으로 만드는 <br/>
                  도서 관리 시스템이에요.
                </strong>
              </h3>
            </AnimationWrap>
            <AnimationWrap delay={0.3}>
              <h6 className="space-3x">
                귀사에 도서 관리 시스템이 마련되어 있나요?<br/>
                여러 규모의 도서관을 운영중이신가요? <br/>
                서재를 관리하고 계신가요?
              </h6>
              <h6>
                이제, 도서 관리자와 직접 대면하지 않아도 괜찮습니다. <br/>
                훨씬 쉽고 간편해진 도서 관리 경험이 여기 있으니까요.
              </h6>
            </AnimationWrap>
          </div>
        </div>
      </section>


      <div className="landingLayout">
        <div className="homeInfoGrid">
          <div className="landingInfo2">
            <AnimationWrap>
              <h3 className="space-4x">
                <strong>
                  책만 관리하지 않아요. <br/>
                  경험도 공유해요.
                </strong>
              </h3>
            </AnimationWrap>
            <AnimationWrap delay={0.3}>
              <h6 className="space-3x">
                독서 경험이란 <br/>
                책에 대해 알아보고, 읽고, 되짚어보는 <br/>
                모든 과정이라고 생각해요.
              </h6>
              <h6>
                내가 속한 회사/모임/도서관의 <br/>
                가장 인기 있는 대여 순위와 후기를 공유하고 <br/>
                나만의 독후감도 기록할 수 있어요.
              </h6>
            </AnimationWrap>
          </div>
          <AnimationWrap delay={0.3} className="imgSec">
            <div style={{backgroundImage: `url(${img_2})`}} className="landingImg2"/>
          </AnimationWrap>
        </div>
      </div>

      <section className="landingLayout">
        <AnimationWrap>
          <div className="moreInfoSec">
            <h3 className="space-4x">
              <strong>
                이미 사용중인 <br/>
                도서 관리 프로그램이 있으신가요?
              </strong>
            </h3>
            <h6>
              하지만 여전히, 도서 관리자에게 직접 대여를 요청하고, 반납하고 계시진 않으신가요? <br/>
              ...
              ...
            </h6>
          </div>
        </AnimationWrap>
      </section>


      <div className="landingLayout">
        <AnimationWrap>
          <h3 className="space-4x">
            <strong>
              이렇게 활용해 보세요!
            </strong>
          </h3>
        </AnimationWrap>

        <AnimationWrap delay={0.3}>
          <HomeUsecaseTab>
            <HomeUsecaseTabComponent
              key="company"
              value="회사"
              component={<HomeUsecaseCompany/>}
            />
            <HomeUsecaseTabComponent
              key="personal"
              value="개인"
              component={<HomeUsecasePersonal/>}
            />
            <HomeUsecaseTabComponent
              key="smallLibrary"
              value="소규모 도서관"
              component={<HomeUsecaseSmallLibrary/>}
            />
            <HomeUsecaseTabComponent
              key="bigLibrary"
              value="대규모 도서관"
              component={<HomeUsecaseBigLibrary/>}
            />
          </HomeUsecaseTab>
        </AnimationWrap>

      </div>

    </WebLayout>
  );
}

export default Home;
