import { nanoid } from 'nanoid';
import { getRandomDate } from './dateTime';

export const messages = [
  {
    id: nanoid(),
    message: ' Tristique nulla aliquet enim tortor at',
    seen: true,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Lacus vel facilisis volutpat est velit egestas dui',
    seen: true,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Proin sed libero enim sed faucibus turpis',
    seen: true,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Auctor urna nunc id cursus',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Vitae auctor eu augue ut lectus arcu',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Tristique nulla aliquet enim tortor at',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Accumsan sit amet nulla facilisi morbi tempus iaculis',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Proin sed libero enim sed faucibus turpis',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
];
