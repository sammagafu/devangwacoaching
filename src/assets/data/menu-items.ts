import type { MenuItemType } from '@/helpers/menu';
import { BIconGridFill, BIconBasketFill, BIconFileEarmarkPlusFill, BIconFileCheckFill, BIconQuestionDiamond, BIconCartCheckFill, BIconStarFill, BIconCardChecklist, BIconCreditCard2FrontFill, BIconHouse, BIconBasket, BIconUiChecksGrid, BIconGraphUp, BIconPeople, BIconFolderCheck, BIconStar, BIconPencilSquare, BIconWallet2, BIconGear, BIconTrash, BIconCreditCard2Front, BIconCartCheck, BIconJournals, BIconSpeedometer2, BIconWallet, BIconMortarboardFill, BIconFileEarmarkText, BIconPersonFillGear, BIconGearFill, BIconTrashFill, BIconPersonFill, BIconBoxArrowRight} from 'bootstrap-icons-vue';
import { faUserGraduate, faUserCog, faUserTie, faLock, faHouse, faBasketShopping,faCalendar,faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faChartBar } from '@fortawesome/free-regular-svg-icons';

export const APP_MENU_ITEMS: MenuItemType[] = [
// {
//   key: "home",
//   icon: BIconUiChecksGrid,
//   label: "Home",
// }
];

export const ADMIN_MENU_ITEMS: MenuItemType[] = [
  {
    key: "dashboards",
    icon: faHouse,
    label: "Dashboard",
    route: { name: "admin.dashboard" },
  },
  {
    key: "pages",
    label: "Pages",
    isTitle: true,
  },
  {
    key: "courses",
    icon: faBasketShopping,
    label: "Courses",
    children: [
      {
        key: "course-all",
        label: "All Courses",
        route: { name: "admin.course-list" },
        parentKey: "courses",
      },
      {
        key: "course-create",
        label: "Course Create",
        route: { name: "admin.create.course" },
        parentKey: "courses",
      }
    ],
  },
  {
    key: "events",
    icon: faCalendar,
    label: "Events",
    children: [
      {
        key: "event-all",
        label: "All Events",
        route: { name: "admin.manage.event" },
        parentKey: "events",
      },
      {
        key: "event-create",
        label: "Create Event",
        route: { name: "admin.manage.event-create" },
        parentKey: "events",
      },
    ],
  },
  {
    key: "students",
    icon: faUserGraduate,
    label: "Students",
    route: { name: "admin.student.list" },
  },  
  {
    key: "community",
    icon: faUsers,
    label: "Community",
    route: { name: "admin.manage.community" },
  },
  {
    key: "reviews",
    icon: faCommentDots,
    label: "Reviews",
    route: { name: "admin.review" },
  },
  {
    key: "earnings",
    icon: faChartBar,
    label: "Earnings",
    route: { name: "admin.earning" },
  },  
];


export const INSTRUCTOR_MENU_ITEMS = [
  {
    title: 'Dashboard',
    route: { name: 'instructor.dashboard' },
    icon: BIconUiChecksGrid
  },
  {
    title: 'My Courses',
    route: { name: 'instructor.course' },
    icon: BIconBasket
  },
  {
    title: 'Quiz',
    route: { name: 'instructor.quiz' },
    icon: BIconQuestionDiamond
  },
  {
    title: 'Earnings',
    route: { name: 'instructor.earning' },
    icon: BIconGraphUp
  },
  {
    title: 'Students',
    route: { name: 'instructor.student' },
    icon: BIconPeople
  },
  {
    title: 'Orders',
    route: { name: 'instructor.order' },
    icon: BIconFolderCheck
  },
  {
    title: 'Reviews',
    route: { name: 'instructor.review' },
    icon: BIconStar
  },
  {
    title: 'Payouts',
    route: { name: 'instructor.payout' },
    icon: BIconWallet2
  },
  {
    title: 'Settings',
    route: { name: 'instructor.settings' },
    icon: BIconGear
  },
  {
    title: 'Delete Profile',
    route: { name: 'instructor.delete.account' },
    icon: BIconTrash
  },
  {
    title: 'Sign Out',
    route: { name: 'auth.sign-in' },
    icon: BIconBoxArrowRight
  },
];

export const STUDENT_MENU_ITEMS = [
  {
    title: 'Dashboard',
    route: { name: 'student.dashboard' },
    icon: BIconUiChecksGrid
  },
  {
    title: 'My Subscriptions',
    route: { name: 'student.subscription' },
    icon: BIconCardChecklist
  },
  {
    title: 'My Courses',
    route: { name: 'student.course' },
    icon: BIconBasket
  },
  {
    title: 'My Communities',
    route: { name: 'student.community' },
    icon: BIconPeople,
  },
  {
    title: 'Payment Info',
    route: { name: 'student.payment' },
    icon: BIconCreditCard2Front
  },
  {
    title: 'Browse Courses',
    route: { name: 'student.bookmark' },
    icon: BIconCartCheck
  },
  {
    title: 'Edit Profile',
    route: { name: 'student.edit.profile' },
    icon: BIconPencilSquare
  },
  {
    title: 'Settings',
    route: { name: 'instructor.settings' },
    icon: BIconGear
  },
  {
    title: 'Delete Profile',
    route: { name: 'instructor.delete.account' },
    icon: BIconTrash
  },
  {
    title: 'Sign Out',
    route: { name: 'auth.sign-in' },
    icon: BIconBoxArrowRight
  }
];

export const CATEGORY_MENU_ITEMS = [
  {
    key: 'development',
    label: 'Development',
    children: [
      {
        key: 'web-development',
        label: 'Web Development',
        parentKey: 'development',
        children: [
          {
            key: 'development-css',
            label: 'CSS',
            route: { name: '' },
            parentKey: 'web-development'
          },
          {
            key: 'development-javaScript',
            label: 'JavaScript',
            route: { name: '' },
            parentKey: 'web-development'
          },
          {
            key: 'development-angular',
            label: 'Angular',
            route: { name: '' },
            parentKey: 'web-development'
          },
          {
            key: 'development-php',
            label: 'PHP',
            route: { name: '' },
            parentKey: 'web-development'
          },
          {
            key: 'development-html',
            label: 'HTML',
            route: { name: '' },
            parentKey: 'web-development'
          },
          {
            key: 'development-react',
            label: 'React',
            route: { name: '' },
            parentKey: 'web-development'
          }
        ]
      },
      {
        key: 'data-science',
        label: 'Data Science',
        route: { name: '' },
        parentKey: 'development',
      },
      {
        key: 'mobile-dvelopment',
        label: 'Mobile Development',
        route: { name: '' },
        parentKey: 'development',
      },
      {
        key: 'programming-language',
        label: 'Programming Language',
        route: { name: '' },
        parentKey: 'development',
      },
      {
        key: 'software-testing',
        label: 'Software Testing',
        route: { name: '' },
        parentKey: 'development',
      },
      {
        key: 'software-engineering',
        label: 'Software Engineering',
        route: { name: '' },
        parentKey: 'development',
      },
      {
        key: 'software-development-tools',
        label: 'Software Development Tools',
        route: { name: '' },
        parentKey: 'development',
      },
    ]
  },
  {
    key: 'design',
    route: { name: '' },
    label: 'Design'
  },
  {
    key: 'marketing',
    route: { name: '' },
    label: 'Marketing'
  },
  {
    key: 'music',
    route: { name: '' },
    label: 'Music'
  },
  {
    key: 'lifestyle',
    route: { name: '' },
    label: 'Lifestyle'
  },
  {
    key: 'it-software',
    route: { name: '' },
    label: 'IT & software'
  },
  {
    key: 'personal-development',
    route: { name: '' },
    label: 'Personal development'
  },
  {
    key: 'health-fitness',
    route: { name: '' },
    label: 'Health & fitness'
  },
  {
    key: 'teaching',
    route: { name: '' },
    label: 'Teaching'
  },
  {
    key: 'social-science',
    route: { name: '' },
    label: 'Social science'
  },
  {
    key: 'math-logic',
    route: { name: '' },
    label: 'Math & logic'
  }
];
