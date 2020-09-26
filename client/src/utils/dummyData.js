import { nanoid } from 'nanoid';

import { getRandomDate } from './dateTime';
import img1 from '../assets/img/random-pictures/Lexington-02.jpg';
import img2 from '../assets/img/random-pictures/Lexington-03.jpg';
import img3 from '../assets/img/random-pictures/Lexington-04.jpg';
import img4 from '../assets/img/random-pictures/Lexington-06.jpg';

export const addressees = [
  {
    id: nanoid(),
    firstName: 'Etta',
    lastName: 'Carroll',
    lastMessage: ' Purus non enim praesent',
    avatar: img1,
  },
  {
    id: nanoid(),
    firstName: 'Fowler',
    lastName: 'Frederick',
    lastMessage: ' Nibh cras pulvinar mattis nunc sed blandit',
    avatar: img2,
  },
  {
    id: nanoid(),
    firstName: 'Leblanc',
    lastName: 'Kinney',
    lastMessage: ' Egestas quis ipsum suspendisse ultrices gravida dictum',
    avatar: img3,
  },
  {
    id: nanoid(),
    firstName: 'Lupe',
    lastName: 'Harding',
    lastMessage:
      ' Fames ac turpis egestas integer eget aliquet nibh praesent tristique',
    avatar: img4,
  },
  {
    id: nanoid(),
    firstName: 'Lorraine',
    lastName: 'Solomon',
    lastMessage:
      ' Vitae congue eu consequat ac felis donec et odio pellentesque',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Barrett',
    lastName: 'Woodard',
    lastMessage: ' At elementum eu facilisis sed odio',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Knowles',
    lastName: 'Estrada',
    lastMessage: ' Enim diam vulputate ut pharetra sit amet aliquam',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Ramsey',
    lastName: 'Mccarthy',
    lastMessage: ' Tristique nulla aliquet enim tortor at',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Noble',
    lastName: 'Gill',
    lastMessage: ' Proin sed libero enim sed faucibus turpis',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Josefina',
    lastName: 'Olson',
    lastMessage:
      ' Fames ac turpis egestas integer eget aliquet nibh praesent tristique',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Jenifer',
    lastName: 'Hunter',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing…empor incididunt ut labore et dolore magna aliqua',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Mona',
    lastName: 'Mitchell',
    lastMessage: ' Vitae auctor eu augue ut lectus arcu',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Mindy',
    lastName: 'King',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing…empor incididunt ut labore et dolore magna aliqua',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Hicks',
    lastName: 'Williamson',
    lastMessage:
      ' Fames ac turpis egestas integer eget aliquet nibh praesent tristique',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Cantrell',
    lastName: 'Oliver',
    lastMessage: ' Enim diam vulputate ut pharetra sit amet aliquam',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Morton',
    lastName: 'Ballard',
    lastMessage: ' Ut placerat orci nulla pellentesque dignissim enim',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Maggie',
    lastName: 'Price',
    lastMessage: ' Vitae auctor eu augue ut lectus arcu',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Sallie',
    lastName: 'Hanson',
    lastMessage: ' Vitae auctor eu augue ut lectus arcu',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Hanson',
    lastName: 'Key',
    lastMessage: ' Enim diam vulputate ut pharetra sit amet aliquam',
    avatar: '',
  },
  {
    id: nanoid(),
    firstName: 'Nguyen',
    lastName: 'Vasquez',
    lastMessage:
      ' Pharetra diam sit amet nisl suscipit adipiscing bibendum est',
    avatar: '',
  },
];

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
  {
    id: nanoid(),
    message: ' Pharetra diam sit amet nisl suscipit adipiscing bibendum est',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Tristique nulla aliquet enim tortor at',
    seen: true,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing…empor incididunt ut labore et dolore magna aliqua',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Pharetra diam sit amet nisl suscipit adipiscing bibendum est',
    seen: true,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Enim diam vulputate ut pharetra sit amet aliquam',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Purus non enim praesent elementum',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message: ' Nibh cras pulvinar mattis nunc sed blandit',
    seen: true,
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
  {
    id: nanoid(),
    message: ' Lacus vel facilisis volutpat est velit egestas dui',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: nanoid(),
    message:
      ' Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: 15,
    message: ' Lacus vel facilisis volutpat est velit egestas dui',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
  {
    id: 21,
    message: ' At elementum eu facilisis sed odio',
    seen: false,
    createdAt: getRandomDate(new Date(2018, 0, 1), new Date()),
    createdBy: '',
  },
];
