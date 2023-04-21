import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import Categories from '../../components/site/Categories/Categories';
import ListCard from '../../components/site/ListCard/ListCard';
import ProductGallery from '../../components/site/ProductGallery/ProductGallery';
import { Box } from '@mui/material';
import { Transition } from 'react-transition-group';
import { getTypeComponents } from '../../components/site/siteComponents/getTypeComponents';
import AnimateHeight from 'react-animate-height';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import Result from '../../components/site/siteComponents/Result';
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const dataStep = [
  { type: 'title', value: 'Сіз Бахтиярға күннің жұмыс жоспарын білу үшін хабарлама жібересіз.' },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Салем, Бахтияр</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: (
      <>
        Толығырақ айтар болсақ, негізгі қызметім кез келген бизнестің диагностикасын жасап , жүйелі түрде табысыңызды көтеріп қана қоймай компанияңызды масштабқа шығаруға көмектесемін.  Бұл  инструмент фирма қызметіндегі қателер мен кемшіліктерді анықтауға, шығындарды азайтуға/оңтайландыруға және
        жұмыс процесінің тиімділігін арттыруға көмектеседі.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Ал енді біз танысайық, сіз өзіңіз туралы аздап айтып берсеңіз!</>,
  },
  {
    type: 'inputs',
    title: <>Введи информацию о себе</>,
    fields: [
      {
        label: 'Пол',
        name: 'gender',
        type: 'radio',
        list: [
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
      },
      {
        label: 'Ваш возраст',
        name: 'year',
        type: 'number',
      },
      {
        label: 'Город',
        name: 'city',
        type: 'text',
      },
      {
        label: 'Почта',
        name: 'email',
        type: 'email',
      },
      {
        label: 'Опыт в бизнесе, лет',
        name: 'expInBussines',
        type: 'number',
      },
      {
        label: 'Название вашего бизнеса',
        name: 'nameBusiness',
        type: 'text',
      },
      {
        label: 'Существование вашего бизнеса, лет',
        name: 'yearBusiness',
        type: 'number',
      },
      {
        label: 'Выберите вид бизнеса',
        name: 'choiceBusiness',
        type: 'radio',
        list: [
          { value: 'service', label: 'Услуга' },
          { value: 'products', label: 'Товарка' },
        ],
      },
    ],
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Ал енді сізбен жұмысқа кірісейік, бірақ әзірше бізбен байланыста қалу үшін   What’sApp чатқа  қосылыңыз.</>,
  },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Дайын!</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ендеше, бастайық. Бұл платформа симулятор негізінде жасалған.  </>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Симулятор деген не?</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: (
      <>
        Симулятор - бұл   виртуалды жасанды IT интелект , бұл инструмент сіздің кәсібіңізді жүелі түрде басқарып қана қоймай, сізді операционка-дан шығуыңызға көмектеседі(операционка-да жүрген адамның байуына уақыт жоқ).Инструментті еңгізу барысында сізді тек қажетті және өзекті құралдар жиынтығы
        мен практикалық тапсырмалар күтеді. Симуляторды сіз өзіңізге ыңғайлы уақытта қолдана аласыз.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Жұмысымызды бастайық. Ол үшін 1 айдағы компанияның орташа саудасын(оборот) жазыңыз. </>,
  },

  {
    type: 'inputs',
    title: <>Айналымды сандарға енгізіңіз</>,
    fields: [
      {
        label: 'Айналым',
        name: 'turnover',
        type: 'number',
      },
    ],
  },
  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Енді,  әр тауарыңыздың/қызметіңіздің үстіне үстіне орташа қанша пайыз(%) (наценка/маржа) қосып отырсыз?</>,
  },
  {
    type: 'chat',
    value: <>Егер сіз маржаның не екенін түсінбесеңіз немесе осы терминді егжей-тегжейлі зерттегіңіз келсе, осы тақырыптағы видеоны қараңыз.</>,
  },
  {
    type: 'video',
  },
  {
    type: 'inputs',
    title: <>Сіз өзіңіздің бағаңызды білесіз бе?</>,
    fields: [
      {
        label: 'Үстеме',
        name: 'margin',
        type: 'number',
      },
    ],
  },
  {
    type: 'inputs',
    title: <>Введи процент наценки</>,
    fields: [
      {
        label: 'Наценка, %',
        name: 'marginPercent',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const typeBusiness = parseInt(form.getValues('marginPercent'));
      if (typeBusiness < 15) {
        return 'bad';
      } else {
        return 'good';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'good') {
        return <>Жақсы!</>;
      } else {
        return (
          <>
            <b>Өте нашар.</b> <br /> <br /> Үстеме бағаны арттыру керек. Егер сізде көтерме сауда(оптом) болса, онда маржа 15%, ал бөлшек сауда(в розницу) болса, 30% және одан жоғары болуы керек.
          </>
        );
      }
    },
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ақпарат үшін рахмет. Мен оқуды жалғастырып, өз бизнесім туралы көбірек білгім келеді!</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Бәрекелді! Жалғастырайық. Сіздің қоймаңызда қанша сумманың тауары бар(остаток товара на складе)?</>,
  },
  {
    type: 'chat',
    value: <>Терминді талдау, зерделеу(инструкция) және тауардың қалдығын есептеу қажет болса, видеоны қараңыз.</>,
  },
  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Егер сіз білсеңіз, қажетті ақпаратты енгізіңіз.</>,
  },
  {
    type: 'inputs',
    title: <>Тауардың қалдығы</>,
    fields: [
      {
        label: 'тауардың қалдығы',
        name: 'restOfGoods',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const restOfGoodsValue = parseInt(form.getValues('restOfGoods'));
      const formula = parseFloat((parseInt(form.getValues('turnover')) - parseInt(form.getValues('margin'))) / 2).toFixed(2);
      if (formula < restOfGoodsValue) {
        return 'bad';
      } else {
        return 'good';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'good') {
        return <>Өте жақсы нәтиже!</>;
      } else {
        return (
          <>Жағдайыңыз қиын екен. Себебі сіздің қоймаңыздағы тауардың саны  1 айда  сатылып жатқан тауардың санынан кемінде 2 есе төмен болуы керек ,яғни қазіргі жағдайда  сіз оборотыңызды кем дегенде 2-3  есе көтеруіңіз қажет.Бұл сұрақтың шешімін келесі инструментте нақты көрсететін боламыз.</>
        );
      }
    },
  },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Бұл үшін қандай іс-шара қолдансам болады?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Поставщик/оптовиктерге қанша қарызсыз?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Егер осы тақырып бойынша сұрақтар туындаса, онда видеоны көріп шығыңыз.</>,
  },
  {
    type: 'video',
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Информацияны бекіту үшін видеоны қайта қараңыз</>,
  },

  {
    type: 'inputs',
    title: <>Жеткізушілер алдындағы қарыз</>,
    fields: [
      {
        label: 'Қарыз',
        name: 'duty',
        type: 'number',
      },
    ],
  },

  {
    status: (form) => {
      const dutyValue = form.getValues('duty');
      const formula = (parseInt(form.getValues('restOfGoods')) * 0.4).toFixed(2);
      if (dutyValue == 0) {
        return 'good';
      } else if (dutyValue > formula) {
        return 'bad';
      } else {
        return 'normal';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'good') {
        return <>Тамаша!</>;
      } else if (status == 'bad') {
        return <>Бұл жаман(</>;
      } else {
        return <>Керемет жұмыс, жарайсың! Барлығы қалыпты.</>;
      }
    },
  },

  {
    type: 'chat',
    value: <>Келесі сұрақ. Сіз айына рекламаға қанша ақша жұмсайсыз?  Осы тақырыптағы видеоны көрейік</>,
  },
  {
    type: 'video',
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Өте қызықты видео. Рахмет!</>,
  },

  {
    type: 'inputs',
    title: <>Маркетинг пен жарнамаға айына қанша ақша жұмсайтыныңызды жазыңыз</>,
    fields: [
      {
        label: 'Сомасы',
        name: 'marketing',
        type: 'number',
      },
    ],
  },

  {
    status: (form) => {
      const marketingValue = parseInt(form.getValues('marketing'));
      const turnoverValue = parseInt(form.getValues('turnover'));
      const marginPercentValue = parseInt(form.getValues('marginPercent'));

      const formula = (marketingValue / turnoverValue).toFixed(2) * 100;
      const dirtyValue = turnoverValue - (turnoverValue * (100 - marginPercentValue)) / 100 - marketingValue;
      form.setValue('marketingPercent', formula);
      form.setValue('dirty', dirtyValue);
      if ((formula > 2 && formula < 3) || formula == 2 || formula == 3) {
        return 'normal';
      } else if (formula > 3) {
        return 'bad';
      } else {
        return 'very-bad';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'normal') {
        return <>Жақсы</>;
      } else if (status == 'bad') {
        return <>Тиімді емес маркетинг</>;
      } else {
        return <>Рекламаға кеткен қаражатыңыз өте төмен, Клиентіңізге сараң болған сайын, сіздің де пайдаңыз өте төмен болады!</>;
      }
    },
  },
  {
    type: 'chat',
    value: <>Видеоны тағы бір рет көрейік! Қайталау-ілімнің анасы! Енді сіз қателеспейсіз!</>,
  },
  {
    type: 'video',
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Қайта көргенде түсініктірек болды, рахмет</>,
  },

  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Сіздің тауардың өзіндік құны мен рекламаға кеткен шығындарды алып тастағандағы табысыңыз осы( грязная прибыль ) , бұл табысқа басқада шығындардың түрі кірмеген(Адм.расходы , зрп)</>,
  },
  {
    type: 'chat',
    value: <>Шығындар түрі:</>,
  },
  {
    type: 'chat',
    value: <>1) тұрақты шығындар(постоянные расходы)</>,
  },
  {
    type: 'chat',
    value: <>2) өзгермелі шығындар(переменные расходы)</>,
  },
  {
    type: 'chat',
    value: <>3) басқа шығындар(прочее)</>,
  },

  {
    type: 'inputs',
    title: <>Есептейік сізде қандай лас пайда бар?</>,
    fields: [
      {
        label: 'Тұрақты шығында',
        name: 'constFlow',
        type: 'number',
      },
      {
        label: 'Өзгермелі шығындар',
        name: 'varFlow',
        type: 'number',
      },
      {
        label: 'Басқа шығындар',
        name: 'otherFlow',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const dirtyValue = parseInt(form.getValues('dirty'));
      const constFlowValue = parseInt(form.getValues('constFlow'));
      const varFlowValue = parseInt(form.getValues('varFlow'));
      const otherFlowValue = parseInt(form.getValues('otherFlow'));
      const flowValue = constFlowValue + varFlowValue + otherFlowValue;
      const cashValue = dirtyValue - flowValue;
      const cashCommand = parseInt(cashValue * 0.3);
      form.setValue('flow', flowValue);
      form.setValue('cash', cashValue);
      form.setValue('cashCommand', cashCommand);
      const dirtyBetween1 = parseInt(dirtyValue * 0.1);
      const dirtyBetween2 = parseInt(dirtyValue * 0.2);

      if (dirtyBetween1 > flowValue && flowValue < dirtyBetween2) {
        return 'good';
      } else {
        return 'bad';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'good') {
        return <>Нормально</>;
      } else {
        return <>Плохо</>;
      }
    },
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Шығыныңыз белгілі мөлшерден асып кетіпті. Проблеманы шешетін 3 жолы бар :</>,
  },
  {
    type: 'chat',
    value: <>1)оборотты көтеру</>,
  },
  {
    type: 'chat',
    value: <>2)наценкамен жұмыс істеу</>,
  },
  {
    type: 'chat',
    value: <>3)керек емес шығындарды анықтап ,алып тастау.</>,
  },

  {
    type: 'chapter-end',
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Келген табыстың барлық шығындардың алып тастағандағы компанияның табысы (бұл шығында жұмыскерлердің айлығы саналмайды)</>,
  },
  {
    type: 'chat',
    value: (
      <>
        Нәтижесінде:{' '}
        <ul>
          <li>Командаңызға берілетін айлық мөлшері:</li>
        </ul>
      </>
    ),
  },

  {
    type: 'inputs',
    title: <>Сіздің командаңыздың жалақысы қандай?</>,
    fields: [
      {
        label: 'Саны',
        name: 'countPeople',
        type: 'number',
      },
      {
        label: 'Жалақыға арналған сумма',
        name: 'wage',
        type: 'number',
      },
    ],
  },
  {
    type: 'inputs',
    title: <>Бонустар</>,
    fields: [
      {
        label: 'Бір айдағы таланттар саны',
        name: 'countTalentsPeople',
        type: 'number',
      },
      {
        label: 'Тоқсан ішінде үздік нәтиже көрсеткен қызметкерлер саны',
        name: 'countKpiPeople',
        type: 'number',
      },
      {
        label: 'Бір жылдағы ең жақсы нәтижелер',
        name: 'countBestResultPeople',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const directSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / parseInt(form.getValues('countPeople'));
      const talentPeopleSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countTalentsPeople')) + directSalaryValue;
      const directBonusValue = (parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countKpiPeople'))) * 3;
      const talentPeopleSalaryYearValue = directBonusValue * 4;
      const netProfit = parseInt(form.getValues('cash')) * 0.7;
      const reinvest = netProfit * 0.7;
      const cashOut = netProfit * 0.3;

      form.setValue('directSalary', directSalaryValue);
      form.setValue('talentPeopleSalary', talentPeopleSalaryValue);
      form.setValue('directBonus', directBonusValue);
      form.setValue('talentPeopleSalaryYear', talentPeopleSalaryYearValue);
      form.setValue('netProfit', parseInt(netProfit.toFixed(2)));
      form.setValue('reinvest', parseInt(reinvest.toFixed(2)));
      form.setValue('cashOut', parseInt(cashOut.toFixed(2)));
      return 'normal';
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'normal') {
        return <>Нәтижеңіз жаман емес , біракта айтыла кететін ұсыныстарымыз бар . Толық білу үшін видеоны көріп щығыңыз.</>;
      }
    },
  },

  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: (
      <>
        <ul>
          <li>Үздік қызметкерлерге бонустар: 600.000 тг</li>
          <li>Тоқсан ішінде үздік нәтиже көрсеткен қызметкерлерге бонустар: 1.000.000 тг</li>
          <li>Жылдың үздік нәтижелері: 1.000.000 тг</li>
        </ul>
      </>
    ),
  },
  {
    type: 'video',
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Мен онымен жұмыс істеймін</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Сіздің ойыңызша компанияңыз өсу потологына жетті ма?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Бұл жағдайда қалған пайданың  30% компанияның өсуіне қайта салып, одан қалған 70% өз бақытыңызға жұмсаңыз!</>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Рахмет!</>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Енді қорытындылайық</>,
  },
];

const result = [
  {
    title: 'Айналым(оборот)',
    label: 'Сіздің айдағы айналымыңыз',
    labelTwo: 'Сізге ұсынылған айналым',
    name: 'turnover',
    recomend: (form) => {
      return form.getValues('countPeople') * 10000000;
    },
  },
  {
    title: 'Үстеме(наценка)',
    label: 'Сіздің үстеме бағаңыз',
    labelTwo: 'Сізге ұсынылған үстеме',
    name: 'marginPercent',
    recomend: (form) => {
      return 30;
    },
  },
  {
    title: 'Тауардың қалдығы(остаток товара)',
    label: 'Сіздің тауар қалдығыңыз',
    labelTwo: 'Ұсынылған тауар қалдығы',
    name: 'restOfGoods',
    recomend: (form) => {
      return parseInt((parseInt(form.getValues('turnover')) - parseInt(form.getValues('margin'))) / 2);
    },
  },
  {
    title: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
    label: 'Сіздің қарызыңыз',
    labelTwo: 'Ұсынылған қарыз',
    name: 'duty',
    recomend: (form) => {
      return 0;
    },
  },
  {
    title: 'Маркетинг',
    label: 'Сіздің маркетингтік шығындарыңыз',
    labelTwo: 'Ұсынылған маркетингтік шығындар',
    name: 'marketingPercent',
    recomend: (form) => {
      return 2.5;
    },
  },
  {
    title: 'Грязная прибыль/маржа',
    label: 'Грязная прибыль/маржа',
    labelTwo: 'Ұсынылған маркетингтік шығындар',
    name: 'dirty',
    recomend: (form) => {
      return (parseInt(form.getValues('turnover')) * 0.025).toFixed(2);
    },
  },
  {
    title: 'Сіздің командаңыздың жалақысы',
    label: 'Сіздің команданың жалақысы',
    labelTwo: 'Команданың ұсынылған жалақысы',
    name: 'wage',
    recomend: (form) => {
      return parseInt(form.getValues('wage')) * parseInt(form.getValues('countPeople'));
    },
  },
  {
    title: 'Команда бонустары',
    label: 'Сіздің командалық бонустарыңыз',
    labelTwo: 'Команданың ұсынылған бонустары',
    name: 'cashCommand',
    recomend: (form) => {
      return 0;
    },
  },
  {
    title: 'Таза пайда',
    label: 'Сіздің таза пайдаңыз',
    labelTwo: 'Болу керек таза пайда',
    name: 'netProfit',
    recomend: (form) => {
      return 0;
    },
  },
];

const HomePage = () => {
  const pageForm = useForm();
  const [dataResult, setDataResult] = useState({});
  const calcData = () => {
    // const turnover = pageForm.getValues('turnover');
    // const margin = pageForm.getValues('margin');
    // const marginPercent = pageForm.getValues('marginPercent');
    // const restOfGoods = pageForm.getValues('restOfGoods');
    // const duty = pageForm.getValues('duty');
    // const marketing = pageForm.getValues('marketing');
    // const marketingPercent = pageForm.getValues('marketingPercent');
    // const dirty = pageForm.getValues('dirty');
    // const constFlow = pageForm.getValues('constFlow');
    // const varFlow = pageForm.getValues('varFlow');
    // const otherFlow = pageForm.getValues('otherFlow');
    // const flow = pageForm.getValues('flow');
    // const cash = pageForm.getValues('cash');
    // const cashCommand = pageForm.getValues('cashCommand');
    // const countPeople = pageForm.getValues('countPeople');
    // const directSalary = pageForm.getValues('directSalary');
    // const countTalentsPeople = pageForm.getValues('countTalentsPeople');
    // const talentPeopleSalary = pageForm.getValues('talentPeopleSalary');
    // const countKpiPeople = pageForm.getValues('countKpiPeople');
    // const directBonus = pageForm.getValues('directBonus');
    // const talentPeopleSalaryYear = pageForm.getValues('talentPeopleSalaryYear');
    // const netProfit = pageForm.getValues('netProfit');
    // const reinvest = pageForm.getValues('reinvest');
    // const cashOut = pageForm.getValues('cashOut');
    return pageForm.getValues();
  };
  const myRef = useRef(null);

  const [activeStep, setActiveStep] = useState(2);

  return (
    <Box sx={{ padding: '35px 26px 35px 28px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ fontWeight: '600', fontSize: '24px', marginRight: '25px' }}>Аудит бизнеса</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#4282E1' }}>
          <img src="img/clock.svg" style={{ marginRight: '5px' }} />
          150 мин.
        </Box>
      </Box>
      <Box sx={{ marginTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #E0E0E0', marginBottom: '24px' }}>
        Сәлем Айбек! Мен-Бақтияр Өсербекұлы, 20–жылдық тәжірибесі бар бизнес-практик қарапайым тілмен айтқанда бизнестің механигімін және жүйелі басқарудан жетекшімін. Сізді біздің платформада қарсы алғаныма қуаныштымын!
      </Box>
      {dataStep?.map((item, itemIndex) => {
        return (
          <div
            style={{
              opacity: itemIndex < activeStep ? '1' : '0',
              transition: 'all .4s',
              transitionDelay: '.4s',
              visibility: itemIndex < activeStep ? 'visible' : 'hidden',
            }}>
            <AnimateHeight duration={400} height={itemIndex < activeStep ? 'auto' : 0}>
              <div> {getTypeComponents(item, pageForm, itemIndex, activeStep)}</div>
            </AnimateHeight>
          </div>
        );
      })}
      <button
        style={{ border: 'none', color: '#fff', background: '#4282E1', borderRadius: '5px', height: '44px', width: '100%', fontSize: '16px', cursor: 'pointer', marginTop: '40px' }}
        ref={myRef}
        onClick={() => {
          setTimeout(() => {
            myRef.current.scrollIntoView({ behavior: 'smooth' });
          }, 500);

          setActiveStep(activeStep + 1);
          calcData();
        }}>
        Жалғастыру
      </button>
      <Result {...calcData()} />
      {activeStep == dataStep?.length &&
        result?.map((itemResult) => (
          <Box sx={{ marginTop: '40px', padding: '24px 24px 24px 50px', borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)', position: 'relative' }}>
            <Box>
              <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {itemResult?.title}</Box>
              <Box sx={{ position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: '#4282E1' }}></Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '25px' }}>
              <label class={clsx('input-wrap')}>
                <div className="input-lable input-label-required">{itemResult?.label}</div>
                <input disabled={true} value={pageForm.getValues(itemResult?.name)} className="input-custom" />
              </label>
              <label class={clsx('input-wrap')}>
                <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>
                <input disabled={true} value={itemResult?.recomend(pageForm)} className="input-custom" />
              </label>
            </Box>
            <Box sx={{ marginTop: '25px', height: '57px', background: 'rgba(66, 130, 225, 0.15)', borderRadius: '6px' }}> </Box>
          </Box>
        ))}
    </Box>
  );
};

export default HomePage;
