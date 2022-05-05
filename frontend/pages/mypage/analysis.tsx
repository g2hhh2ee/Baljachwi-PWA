import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import Header from "../../components/common/Header";
import ProfileCard from "../../components/mypage/ProfileCard";

import { getBudget, getPieChartValue } from "../../api/mypage";

import dayjs from "dayjs";

import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

interface ICalendar {
  year: number | string;
  month: number | string;
}
interface IDaily extends ICalendar {
  day: number | string;
}

// interface ICategories {
//   categoryName: string;
//   value: number;
// }
interface AnalysisProps {
  date?: string;
  year: number | string;
  month: number | string;
}

const Analysis = () => {
  // const [budgets, setBudgets] = useState(0);
  const [date, setDate] = useState(new Date());
  // const [month, setMonth] = useState(Number(dayjs(date).format("M")));
  // const [year, setYear] = useState(Number(dayjs(date).format("YYYY")));
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [dailyExpenditure, setDailyExpenditure] = useState(0);
  const [estimatedExpenditure, setEstimatedExpenditure] = useState(0);
  const [categories, setCategories] = useState([]);
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const dateForm = dayjs(date).format("YYYY-MM-DD");

  const categoryName = Object.keys(categories);
  const categoryValue = Object.values(categories);
  console.log(categoryName);
  console.log(categoryValue);
  useEffect(() => {
    console.log(year);
    console.log(month);
    getPieChartValue(year, month)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("😥🙀 도넛 차트 조회 실패");
      });

    getBudget(dateForm)
      .then((res) => {
        console.log(res.data);
        console.log("예산 조회 성공! 🤸‍♀️🔥");
        setRemainingBudget(res.data.data.remainingBudget);
        setDailyExpenditure(res.data.data.dailyExpenditure);
        setEstimatedExpenditure(res.data.data.estimatedExpenditure);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("😥🙀 예산 조회 실팩ㄱ");
      });
  }, [month, year]);
  // doughnut chart data set
  const data1 = {
    labels: [
      "문화/여가",
      "육아/반려",
      "교육/학습",
      "경조사비",
      "미분류",
      "의료/건강",
      "교통비",
      "쇼핑",
      "식비",
      "주거/통신",
    ],
    datasets: [
      {
        data: [
          30000, 15000, 35000, 20000, 20000, 45000, 15000, 15000, 15000, 330000,
        ],
        backgroundColor: [
          "#ff9aa2",
          "#abbeec",
          "#ffdf6f",
          "#8cc084",
          "#968e85",
          "#e5e1e0",
          "#90d2d8",
          "#ffc988",
          "#e79796",
          "#8cc1d3",
        ],
        hoverBackgroundColor: [
          "#8cc1d3",
          "#e79796",
          "#ffc988",
          "#90d2d8",
          "#e5e1e0",
          "#ffdf6f",
          "#abbeec",
          "#ff9aa2",
        ],
      },
    ],
  };
  // const getBudgetList = useCallback(() => {
  //   console.log(date);
  //   getBudget(date)
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       // setBudgets(res.data.data);
  //       console.log(res.data);
  //       console.log("예산 조회 성공! 🤸‍♀️🔥");
  //       setRemainingBudget(res.data.data.remainingBudget);
  //       setDailyExpenditure(res.data.data.dailyExpenditure);
  //       setEstimatedExpenditure(res.data.data.estimatedExpenditure);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log("😥🙀 예산 조회 실팩ㄱ");
  //     });
  // }, [date, setBudgets]);
  // useEffect(() => {
  //   getBudgetList();
  // }, [getBudgetList]);

  // useEffect(() => {
  //   getBudget()
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log("알림 조회 성공! 🤸‍♀️🔥");
  //       setRemainingBudget(res.data.data.remainingBudget);
  //       setDailyExpenditure(res.data.data.dailyExpenditure);
  //       setEstimatedExpenditure(res.data.data.estimatedExpenditure);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log("😥🙀 알림 조회 실팩ㄱ");
  //     });
  // }, []);
  return (
    <>
      <Container>
        <Header label="마이페이지" />
        <PageContainer>
          <ProfileCardContainer>
            <ProfileCard />
          </ProfileCardContainer>

          <ProfileContentListContainer>
            <ProfileMenuCardItem>
              <ProfileMenuCardContent>
                <span className="title">목표를 향해서!</span>
                <span className="description">
                  내 생활 습관을 분석해보세요.
                </span>
              </ProfileMenuCardContent>

              <DivisionLine />

              <ContentsDiv>
                <h5>이번 달 남은 예산</h5>
                <h4>300,000 원 남음</h4>
                <h6>하루에 12,000원씩 쓸 수 있습니다.</h6>
                <h6>이 속도로 소비하면 총 1,000,000원을 쓰게 됩니다.</h6>
              </ContentsDiv>

              <DivisionLine />

              <ContentsDiv>
                <div className="charts">
                  <div className="circle">
                    <h2>카테고리별 지출 통계</h2>
                    <Doughnut data={data1} width={400} height={400} />
                  </div>
                </div>
              </ContentsDiv>
            </ProfileMenuCardItem>
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default Analysis;

const Container = styled.div`
  /* height: 100vh; */
  height: 100%;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 30vh;
  color: #ffffff;
`;

const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;

const ProfileContentListContainer = styled.div`
  /* filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25)); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: #f4f4f4; */
  background-color: #ffffff;
  border: none;
  /* border-radius: 1rem; */
  width: 100%;
  height: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const ProfileMenuCardItem = styled.div`
  /* width: 32rem; */
  /* margin-left: 2rem; */
  /* filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25)); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;

  width: 100%;
  /* width: 32rem; */
  /* height: 9rem; */
  /* width: 320px; */
  /* height: 90px; */

  font-size: 1.6rem;
  padding: 1.6rem;
  gap: 2rem;

  font-family: "Noto Sans KR", sans-serif;
  color: #747373;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* padding: 2rem 0; */
  height: 100%;
  .title {
    color: #33487f;
    font-weight: 700;
    font-size: 1.6rem;
  }
  .description {
    color: #696969;
    font-size: 1rem;
    font-weight: 400;
  }
`;

// const ProfileMenuCardTitle = styled.span`
//   color: #33487f;
//   font-weight: 700;
//   font-size: 1.6rem;
// `;

// const ProfileMenuCardDetail = styled.span`
//   color: #696969;
//   font-size: 1rem;
//   font-weight: 400;
// `;

const DivisionLine = styled.hr`
  border-top: 2px solid lightslategray;
  /* border-color: #f6f6f6; */
`;

const ContentsDiv = styled.div`
  .charts {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 20px;
    gap: 40px;
    .bar {
      /* margin-left: 20px; */
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .circle {
      /* width: 30rem;
    height: 30rem; */
      h2 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 20px;
      }
    }
  }
`;
