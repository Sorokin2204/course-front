import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
const Result = ({
  turnover,
  margin,
  marginPercent,
  restOfGoods,
  duty,
  marketing,
  marketingPercent,
  dirty,
  constFlow,
  varFlow,
  otherFlow,
  flow,
  cash,
  cashCommand,
  countPeople,
  directSalary,
  countTalentsPeople,
  talentPeopleSalary,
  countKpiPeople,
  directBonus,
  talentPeopleSalaryYear,
  netProfit,
  reinvest,
  cashOut,
}) => {
  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', position: 'fixed', top: '20%', left: '10px', columnGap: '30px', rowGap: '10px' }}>
        <Box>Оборот</Box>
        <Box sx={{ fontWeight: '600' }}>{turnover}</Box>
        <Box>Наценка</Box>
        <Box sx={{ fontWeight: '600' }}>{margin}</Box>
        <Box>Процент наценки</Box>
        <Box sx={{ fontWeight: '600' }}>{marginPercent}</Box>
        <Box>Остаток</Box>
        <Box sx={{ fontWeight: '600' }}>{restOfGoods}</Box>
        <Box>Долг</Box>
        <Box sx={{ fontWeight: '600' }}>{duty}</Box>
        <Box>Маркетинг</Box>
        <Box sx={{ fontWeight: '600' }}>{marketing}</Box>
        <Box>Процент маркетинг</Box>
        <Box sx={{ fontWeight: '600' }}>{marketingPercent}</Box>
        <Box>Грязные</Box>
        <Box sx={{ fontWeight: '600' }}>{dirty}</Box>
        <Box>Расход постоянный</Box>
        <Box sx={{ fontWeight: '600' }}>{constFlow}</Box>
        <Box>Расход переменый</Box>
        <Box sx={{ fontWeight: '600' }}>{varFlow}</Box>
        <Box>Расход прочие</Box>
        <Box sx={{ fontWeight: '600' }}>{otherFlow}</Box>
        <Box>Расход</Box>
        <Box sx={{ fontWeight: '600' }}>{flow}</Box>
        <Box>Кэш</Box>
        <Box sx={{ fontWeight: '600' }}>{cash}</Box>
        <Box>Денег команды</Box>
        <Box sx={{ fontWeight: '600' }}>{cashCommand}</Box>
        <Box>Количество сотрудников</Box>
        <Box sx={{ fontWeight: '600' }}>{countPeople}</Box>
        <Box>Прямая зп</Box>
        <Box sx={{ fontWeight: '600' }}>{directSalary}</Box>
        <Box>Кол-во топ сотруд</Box>
        <Box sx={{ fontWeight: '600' }}>{countTalentsPeople}</Box>
        <Box>Зп топа</Box>
        <Box sx={{ fontWeight: '600' }}>{talentPeopleSalary}</Box>
        <Box>Кол-во KPI сотруд</Box>
        <Box sx={{ fontWeight: '600' }}>{countKpiPeople}</Box>
        <Box>Прямой бонус зп</Box>
        <Box sx={{ fontWeight: '600' }}>{directBonus}</Box>
        <Box>зарплата топов за год за единицу</Box>
        <Box sx={{ fontWeight: '600' }}>{talentPeopleSalaryYear}</Box>
        <Box>Чистая прибыль</Box>
        <Box sx={{ fontWeight: '600' }}>{netProfit}</Box>
        <Box>Реинвест</Box>
        <Box sx={{ fontWeight: '600' }}>{reinvest}</Box>
        <Box>СashOut</Box>
        <Box sx={{ fontWeight: '600' }}>{cashOut}</Box>
      </Box>
    </>
  );
};

export default Result;
