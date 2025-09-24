

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {

  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard/analytics",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard/dash-ecom",
              label: "Dashboard",
              active: pathname === "/dashboard/dash-ecom",
              icon: "heroicons:shopping-cart",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Course',
      id: 'course',
      menus: [
        {
          id: 'create',
          href: '/course/create',
          label: 'Create Course',
          active: pathname.includes('/course/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'course-list',
          href: '/course/course-list',
          label: 'Course List',
          active: pathname.includes('/course/course-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        }
      ],
    },
    {
      groupLabel: 'Course Resource',
      id: 'course-resource',
      menus: [
        // {
        //   id: 'create',
        //   href: '/course-resource/create',
        //   label: 'Create',
        //   active: pathname.includes('/course-resource/create'),
        //   icon: 'heroicons-outline:document',
        //   submenus: [],
        // },
        {
          id: 'course-resource-list',
          href: '/course-resource/course-resource-list',
          label: 'Course Resource List',
          active: pathname.includes('/course-resource/course-resource-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        }
      ],
    },
    {
      groupLabel: 'Course Lesson',
      id: 'course-lesson',
      menus: [
        // {
        //   id: 'create',
        //   href: '/course-lesson/create',
        //   label: 'Create',
        //   active: pathname.includes('/course-lesson/create'),
        //   icon: 'heroicons-outline:document',
        //   submenus: [],
        // },
        {
          id: 'course-lesson-list',
          href: '/course-lesson/course-lesson-list',
          label: 'Course Lesson List',
          active: pathname.includes('/course-lesson/course-lesson-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        
      ],
    },
    {
      groupLabel: 'Course Lecture',
      id: 'course-lecture',
      menus: [
        // {
        //   id: 'create',
        //   href: '/course-lecture/create',
        //   label: 'Create',
        //   active: pathname.includes('/course-lecture/create'),
        //   icon: 'heroicons-outline:document',
        //   submenus: [],
        // },
        {
          id: 'course-lecture-list',
          href: '/course-lecture/course-lecture-list',
          label: 'Course Lecture List',
          active: pathname.includes('/course-lecture/course-lecture-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        
      ],
    },
    {
      groupLabel: 'Category',
      id: 'category',
      menus: [
        {
          id: 'create',
          href: '/category/create',
          label: 'Create',
          active: pathname.includes('/category/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'category-list',
          href: '/category/category-list',
          label: 'Category List',
          active: pathname.includes('/category/category-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        
      ],
    },
    {
      groupLabel: 'Course Language',
      id: 'course-language',
      menus: [
        {
          id: 'create',
          href: '/course-language/create',
          label: 'Create',
          active: pathname.includes('/course-language/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'course-language-list',
          href: '/course-language/course-language-list',
          label: 'Course Language List',
          active: pathname.includes('/course-language/course-language-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        
      ],
    },
    {
      groupLabel: 'Course Tag',
      id: 'course-tag',
      menus: [
        {
          id: 'create',
          href: '/course-tag/create',
          label: 'Create',
          active: pathname.includes('/course-tag/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'course-tag-list',
          href: '/course-tag/course-tag-list',
          label: 'Course Tag List',
          active: pathname.includes('/course-tag/course-tag-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        
      ],
    },
    // {
    //   groupLabel: "Course Form Wizard",
    //   id: "course_form_wizard",
    //   menus: [
    //     {
    //       id: "create",
    //       href: "/course-form-wizard/create",
    //       label: "Add New Course",
    //       active: pathname.includes("/course-form-wizard/create"),
    //       icon: "heroicons:conversation",
    //       submenus: [],
    //     },
    //   ],
    // },
    {
      groupLabel: "Archive Videos",
      id: "archive_videos",
      menus: [
        {
          id: "create",
          href: "/archive-video/create",
          label: "Add New Video",
          active: pathname.includes("/archive-video/create"),
          icon: "heroicons:video-camera",
          submenus: [],
        },
        {
          id: "archive_videos",
          href: "/archive-video/video-list",
          label: "Video List",
          active: pathname.includes("/archive-video/video-list"),
          icon: "heroicons:video-camera",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Device Users",
      id: "device-users",
      menus: [
        {
          id: "device-users",
          href: "/device-user/device-user-list",
          label: "Device User List",
          active: pathname.includes("/device-user/device-user-list"),
          icon: "heroicons:device-phone-mobile",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Assignment File',
      id: 'assignment-file',
      menus: [
        {
          id: 'assignment-file-list',
          href: '/assignment-file/assignment-file-list',
          label: 'Assignment File List',
          active: pathname.includes('/assignment-file/assignment-file-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/assignment-file/create',
          label: 'Create',
          active: pathname.includes('/assignment-file/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Assignment Submit',
      id: 'assignment-submit',
      menus: [
        {
          id: 'assignment-submit-list',
          href: '/assignment-submit/assignment-submit-list',
          label: 'Assignment Submit List',
          active: pathname.includes('/assignment-submit/assignment-submit-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/assignment-submit/create',
          label: 'Create',
          active: pathname.includes('/assignment-submit/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Assignment',
      id: 'assignment',
      menus: [
        {
          id: 'assignment-list',
          href: '/assignment/assignment-list',
          label: 'Assignment List',
          active: pathname.includes('/assignment/assignment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/assignment/create',
          label: 'Create',
          active: pathname.includes('/assignment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Audit Log',
      id: 'audit-log',
      menus: [
        {
          id: 'audit-log-list',
          href: '/audit-log/audit-log-list',
          label: 'Audit Log List',
          active: pathname.includes('/audit-log/audit-log-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/audit-log/create',
          label: 'Create',
          active: pathname.includes('/audit-log/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Batch Course',
      id: 'batch-course',
      menus: [
        {
          id: 'batch-course-list',
          href: '/batch-course/batch-course-list',
          label: 'Batch Course List',
          active: pathname.includes('/batch-course/batch-course-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/batch-course/create',
          label: 'Create',
          active: pathname.includes('/batch-course/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Batch Enrollment',
      id: 'batch-enrollment',
      menus: [
        {
          id: 'batch-enrollment-list',
          href: '/batch-enrollment/batch-enrollment-list',
          label: 'Batch Enrollment List',
          active: pathname.includes('/batch-enrollment/batch-enrollment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/batch-enrollment/create',
          label: 'Create',
          active: pathname.includes('/batch-enrollment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Batch Pricing',
      id: 'batch-pricing',
      menus: [
        {
          id: 'batch-pricing-list',
          href: '/batch-pricing/batch-pricing-list',
          label: 'Batch Pricing List',
          active: pathname.includes('/batch-pricing/batch-pricing-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/batch-pricing/create',
          label: 'Create',
          active: pathname.includes('/batch-pricing/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Batch',
      id: 'batch',
      menus: [
        {
          id: 'batch-list',
          href: '/batch/batch-list',
          label: 'Batch List',
          active: pathname.includes('/batch/batch-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/batch/create',
          label: 'Create',
          active: pathname.includes('/batch/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Cart Management',
      id: 'cart-management',
      menus: [
        {
          id: 'cart-management-list',
          href: '/cart-management/cart-management-list',
          label: 'Cart Management List',
          active: pathname.includes('/cart-management/cart-management-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/cart-management/create',
          label: 'Create',
          active: pathname.includes('/cart-management/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Certificate',
      id: 'certificate',
      menus: [
        {
          id: 'certificate-list',
          href: '/certificate/certificate-list',
          label: 'Certificate List',
          active: pathname.includes('/certificate/certificate-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/certificate/create',
          label: 'Create',
          active: pathname.includes('/certificate/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Client',
      id: 'client',
      menus: [
        {
          id: 'client-list',
          href: '/client/client-list',
          label: 'Client List',
          active: pathname.includes('/client/client-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/client/create',
          label: 'Create',
          active: pathname.includes('/client/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Coupon Batch',
      id: 'coupon-batch',
      menus: [
        {
          id: 'coupon-batch-list',
          href: '/coupon-batch/coupon-batch-list',
          label: 'Coupon Batch List',
          active: pathname.includes('/coupon-batch/coupon-batch-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/coupon-batch/create',
          label: 'Create',
          active: pathname.includes('/coupon-batch/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Coupon',
      id: 'coupon',
      menus: [
        {
          id: 'coupon-list',
          href: '/coupon/coupon-list',
          label: 'Coupon List',
          active: pathname.includes('/coupon/coupon-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/coupon/create',
          label: 'Create',
          active: pathname.includes('/coupon/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Course Enrollment',
      id: 'course-enrollment',
      menus: [
        {
          id: 'course-enrollment-list',
          href: '/course-enrollment/course-enrollment-list',
          label: 'Course Enrollment List',
          active: pathname.includes('/course-enrollment/course-enrollment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/course-enrollment/create',
          label: 'Create',
          active: pathname.includes('/course-enrollment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Course Installment Plan',
      id: 'course-installment-plan',
      menus: [
        {
          id: 'course-installment-plan-list',
          href: '/course-installment-plan/course-installment-plan-list',
          label: 'Course Installment Plan List',
          active: pathname.includes('/course-installment-plan/course-installment-plan-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/course-installment-plan/create',
          label: 'Create',
          active: pathname.includes('/course-installment-plan/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Course Instructor',
      id: 'course-instructor',
      menus: [
        {
          id: 'course-instructor-list',
          href: '/course-instructor/course-instructor-list',
          label: 'Course Instructor List',
          active: pathname.includes('/course-instructor/course-instructor-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'create',
          href: '/course-instructor/create',
          label: 'Create',
          active: pathname.includes('/course-instructor/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Device User',
      id: 'device-user',
      menus: [
        {
          id: 'create',
          href: '/device-user/create',
          label: 'Create',
          active: pathname.includes('/device-user/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'device-user-list',
          href: '/device-user/device-user-list',
          label: 'Device User List',
          active: pathname.includes('/device-user/device-user-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Device',
      id: 'device',
      menus: [
        {
          id: 'create',
          href: '/device/create',
          label: 'Create',
          active: pathname.includes('/device/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'device-list',
          href: '/device/device-list',
          label: 'Device List',
          active: pathname.includes('/device/device-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Discussion',
      id: 'discussion',
      menus: [
        {
          id: 'create',
          href: '/discussion/create',
          label: 'Create',
          active: pathname.includes('/discussion/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'discussion-list',
          href: '/discussion/discussion-list',
          label: 'Discussion List',
          active: pathname.includes('/discussion/discussion-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Email Notification Setting',
      id: 'email-notification-setting',
      menus: [
        {
          id: 'create',
          href: '/email-notification-setting/create',
          label: 'Create',
          active: pathname.includes('/email-notification-setting/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'email-notification-setting-list',
          href: '/email-notification-setting/email-notification-setting-list',
          label: 'Email Notification Setting List',
          active: pathname.includes('/email-notification-setting/email-notification-setting-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Email Template',
      id: 'email-template',
      menus: [
        {
          id: 'create',
          href: '/email-template/create',
          label: 'Create',
          active: pathname.includes('/email-template/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'email-template-list',
          href: '/email-template/email-template-list',
          label: 'Email Template List',
          active: pathname.includes('/email-template/email-template-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Exam Question',
      id: 'exam-question',
      menus: [
        {
          id: 'create',
          href: '/exam-question/create',
          label: 'Create',
          active: pathname.includes('/exam-question/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'exam-question-list',
          href: '/exam-question/exam-question-list',
          label: 'Exam Question List',
          active: pathname.includes('/exam-question/exam-question-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Exam',
      id: 'exam',
      menus: [
        {
          id: 'create',
          href: '/exam/create',
          label: 'Create',
          active: pathname.includes('/exam/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'exam-list',
          href: '/exam/exam-list',
          label: 'Exam List',
          active: pathname.includes('/exam/exam-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Forum Category',
      id: 'forum-category',
      menus: [
        {
          id: 'create',
          href: '/forum-category/create',
          label: 'Create',
          active: pathname.includes('/forum-category/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'forum-category-list',
          href: '/forum-category/forum-category-list',
          label: 'Forum Category List',
          active: pathname.includes('/forum-category/forum-category-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Forum Post Comment',
      id: 'forum-post-comment',
      menus: [
        {
          id: 'create',
          href: '/forum-post-comment/create',
          label: 'Create',
          active: pathname.includes('/forum-post-comment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'forum-post-comment-list',
          href: '/forum-post-comment/forum-post-comment-list',
          label: 'Forum Post Comment List',
          active: pathname.includes('/forum-post-comment/forum-post-comment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Forum Post',
      id: 'forum-post',
      menus: [
        {
          id: 'create',
          href: '/forum-post/create',
          label: 'Create',
          active: pathname.includes('/forum-post/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'forum-post-list',
          href: '/forum-post/forum-post-list',
          label: 'Forum Post List',
          active: pathname.includes('/forum-post/forum-post-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Installment Payment',
      id: 'installment-payment',
      menus: [
        {
          id: 'create',
          href: '/installment-payment/create',
          label: 'Create',
          active: pathname.includes('/installment-payment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'installment-payment-list',
          href: '/installment-payment/installment-payment-list',
          label: 'Installment Payment List',
          active: pathname.includes('/installment-payment/installment-payment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Installment Plan',
      id: 'installment-plan',
      menus: [
        {
          id: 'create',
          href: '/installment-plan/create',
          label: 'Create',
          active: pathname.includes('/installment-plan/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'installment-plan-list',
          href: '/installment-plan/installment-plan-list',
          label: 'Installment Plan List',
          active: pathname.includes('/installment-plan/installment-plan-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Instructor Certificate',
      id: 'instructor-certificate',
      menus: [
        {
          id: 'create',
          href: '/instructor-certificate/create',
          label: 'Create',
          active: pathname.includes('/instructor-certificate/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'instructor-certificate-list',
          href: '/instructor-certificate/instructor-certificate-list',
          label: 'Instructor Certificate List',
          active: pathname.includes('/instructor-certificate/instructor-certificate-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Instructor Skill',
      id: 'instructor-skill',
      menus: [
        {
          id: 'create',
          href: '/instructor-skill/create',
          label: 'Create',
          active: pathname.includes('/instructor-skill/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'instructor-skill-list',
          href: '/instructor-skill/instructor-skill-list',
          label: 'Instructor Skill List',
          active: pathname.includes('/instructor-skill/instructor-skill-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Instructor',
      id: 'instructor',
      menus: [
        {
          id: 'create',
          href: '/instructor/create',
          label: 'Create',
          active: pathname.includes('/instructor/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'instructor-list',
          href: '/instructor/instructor-list',
          label: 'Instructor List',
          active: pathname.includes('/instructor/instructor-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Language',
      id: 'language',
      menus: [
        {
          id: 'create',
          href: '/language/create',
          label: 'Create',
          active: pathname.includes('/language/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'language-list',
          href: '/language/language-list',
          label: 'Language List',
          active: pathname.includes('/language/language-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Leader Board',
      id: 'leader-board',
      menus: [
        {
          id: 'create',
          href: '/leader-board/create',
          label: 'Create',
          active: pathname.includes('/leader-board/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'leader-board-list',
          href: '/leader-board/leader-board-list',
          label: 'Leader Board List',
          active: pathname.includes('/leader-board/leader-board-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Lesson Exam Question',
      id: 'lesson-exam-question',
      menus: [
        {
          id: 'create',
          href: '/lesson-exam-question/create',
          label: 'Create',
          active: pathname.includes('/lesson-exam-question/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'lesson-exam-question-list',
          href: '/lesson-exam-question/lesson-exam-question-list',
          label: 'Lesson Exam Question List',
          active: pathname.includes('/lesson-exam-question/lesson-exam-question-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Lesson Exam',
      id: 'lesson-exam',
      menus: [
        {
          id: 'create',
          href: '/lesson-exam/create',
          label: 'Create',
          active: pathname.includes('/lesson-exam/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'lesson-exam-list',
          href: '/lesson-exam/lesson-exam-list',
          label: 'Lesson Exam List',
          active: pathname.includes('/lesson-exam/lesson-exam-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Lesson Question Option',
      id: 'lesson-question-option',
      menus: [
        {
          id: 'create',
          href: '/lesson-question-option/create',
          label: 'Create',
          active: pathname.includes('/lesson-question-option/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'lesson-question-option-list',
          href: '/lesson-question-option/lesson-question-option-list',
          label: 'Lesson Question Option List',
          active: pathname.includes('/lesson-question-option/lesson-question-option-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Lesson Question',
      id: 'lesson-question',
      menus: [
        {
          id: 'create',
          href: '/lesson-question/create',
          label: 'Create',
          active: pathname.includes('/lesson-question/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'lesson-question-list',
          href: '/lesson-question/lesson-question-list',
          label: 'Lesson Question List',
          active: pathname.includes('/lesson-question/lesson-question-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Live Class',
      id: 'live-class',
      menus: [
        {
          id: 'create',
          href: '/live-class/create',
          label: 'Create',
          active: pathname.includes('/live-class/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'live-class-list',
          href: '/live-class/live-class-list',
          label: 'Live Class List',
          active: pathname.includes('/live-class/live-class-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Maps',
      id: 'maps',
      menus: [
        {
          id: 'maps-leaflet',
          href: '/maps/maps-leaflet',
          label: 'Maps Leaflet',
          active: pathname.includes('/maps/maps-leaflet'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'maps-vector',
          href: '/maps/maps-vector',
          label: 'Maps Vector',
          active: pathname.includes('/maps/maps-vector'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Menu',
      id: 'menu',
      menus: [
        {
          id: 'create',
          href: '/menu/create',
          label: 'Create',
          active: pathname.includes('/menu/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'menu-list',
          href: '/menu/menu-list',
          label: 'Menu List',
          active: pathname.includes('/menu/menu-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Meta',
      id: 'meta',
      menus: [
        {
          id: 'create',
          href: '/meta/create',
          label: 'Create',
          active: pathname.includes('/meta/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'meta-list',
          href: '/meta/meta-list',
          label: 'Meta List',
          active: pathname.includes('/meta/meta-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Module',
      id: 'module',
      menus: [
        {
          id: 'create',
          href: '/module/create',
          label: 'Create',
          active: pathname.includes('/module/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'module-list',
          href: '/module/module-list',
          label: 'Module List',
          active: pathname.includes('/module/module-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Notice',
      id: 'notice',
      menus: [
        {
          id: 'create',
          href: '/notice/create',
          label: 'Create',
          active: pathname.includes('/notice/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'notice-list',
          href: '/notice/notice-list',
          label: 'Notice List',
          active: pathname.includes('/notice/notice-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Notification',
      id: 'notification',
      menus: [
        {
          id: 'create',
          href: '/notification/create',
          label: 'Create',
          active: pathname.includes('/notification/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'notification-list',
          href: '/notification/notification-list',
          label: 'Notification List',
          active: pathname.includes('/notification/notification-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Operation',
      id: 'operation',
      menus: [
        {
          id: 'create',
          href: '/operation/create',
          label: 'Create',
          active: pathname.includes('/operation/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'operation-list',
          href: '/operation/operation-list',
          label: 'Operation List',
          active: pathname.includes('/operation/operation-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Order Item',
      id: 'order-item',
      menus: [
        {
          id: 'create',
          href: '/order-item/create',
          label: 'Create',
          active: pathname.includes('/order-item/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'order-item-list',
          href: '/order-item/order-item-list',
          label: 'Order Item List',
          active: pathname.includes('/order-item/order-item-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Order',
      id: 'order',
      menus: [
        {
          id: 'create',
          href: '/order/create',
          label: 'Create',
          active: pathname.includes('/order/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'order-list',
          href: '/order/order-list',
          label: 'Order List',
          active: pathname.includes('/order/order-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Page',
      id: 'page',
      menus: [
        {
          id: 'create',
          href: '/page/create',
          label: 'Create',
          active: pathname.includes('/page/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'page-list',
          href: '/page/page-list',
          label: 'Page List',
          active: pathname.includes('/page/page-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Partnership',
      id: 'partnership',
      menus: [
        {
          id: 'create',
          href: '/partnership/create',
          label: 'Create',
          active: pathname.includes('/partnership/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'partnership-list',
          href: '/partnership/partnership-list',
          label: 'Partnership List',
          active: pathname.includes('/partnership/partnership-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Payment',
      id: 'payment',
      menus: [
        {
          id: 'create',
          href: '/payment/create',
          label: 'Create',
          active: pathname.includes('/payment/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'payment-list',
          href: '/payment/payment-list',
          label: 'Payment List',
          active: pathname.includes('/payment/payment-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Popup Offer',
      id: 'popup-offer',
      menus: [
        {
          id: 'create',
          href: '/popup-offer/create',
          label: 'Create',
          active: pathname.includes('/popup-offer/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'popup-offer-list',
          href: '/popup-offer/popup-offer-list',
          label: 'Popup Offer List',
          active: pathname.includes('/popup-offer/popup-offer-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Product Category',
      id: 'product-category',
      menus: [
        {
          id: 'create',
          href: '/product-category/create',
          label: 'Create',
          active: pathname.includes('/product-category/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'product-category-list',
          href: '/product-category/product-category-list',
          label: 'Product Category List',
          active: pathname.includes('/product-category/product-category-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Product Image',
      id: 'product-image',
      menus: [
        {
          id: 'create',
          href: '/product-image/create',
          label: 'Create',
          active: pathname.includes('/product-image/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'product-image-list',
          href: '/product-image/product-image-list',
          label: 'Product Image List',
          active: pathname.includes('/product-image/product-image-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Product Review',
      id: 'product-review',
      menus: [
        {
          id: 'create',
          href: '/product-review/create',
          label: 'Create',
          active: pathname.includes('/product-review/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'product-review-list',
          href: '/product-review/product-review-list',
          label: 'Product Review List',
          active: pathname.includes('/product-review/product-review-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Product Tag',
      id: 'product-tag',
      menus: [
        {
          id: 'create',
          href: '/product-tag/create',
          label: 'Create',
          active: pathname.includes('/product-tag/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'product-tag-list',
          href: '/product-tag/product-tag-list',
          label: 'Product Tag List',
          active: pathname.includes('/product-tag/product-tag-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Product',
      id: 'product',
      menus: [
        {
          id: 'create',
          href: '/product/create',
          label: 'Create',
          active: pathname.includes('/product/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'product-list',
          href: '/product/product-list',
          label: 'Product List',
          active: pathname.includes('/product/product-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Question Category',
      id: 'question-category',
      menus: [
        {
          id: 'create',
          href: '/question-category/create',
          label: 'Create',
          active: pathname.includes('/question-category/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'question-category-list',
          href: '/question-category/question-category-list',
          label: 'Question Category List',
          active: pathname.includes('/question-category/question-category-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Question Option',
      id: 'question-option',
      menus: [
        {
          id: 'create',
          href: '/question-option/create',
          label: 'Create',
          active: pathname.includes('/question-option/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'question-option-list',
          href: '/question-option/question-option-list',
          label: 'Question Option List',
          active: pathname.includes('/question-option/question-option-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Question Type',
      id: 'question-type',
      menus: [
        {
          id: 'create',
          href: '/question-type/create',
          label: 'Create',
          active: pathname.includes('/question-type/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'question-type-list',
          href: '/question-type/question-type-list',
          label: 'Question Type List',
          active: pathname.includes('/question-type/question-type-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Question',
      id: 'question',
      menus: [
        {
          id: 'create',
          href: '/question/create',
          label: 'Create',
          active: pathname.includes('/question/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'question-list',
          href: '/question/question-list',
          label: 'Question List',
          active: pathname.includes('/question/question-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Review',
      id: 'review',
      menus: [
        {
          id: 'create',
          href: '/review/create',
          label: 'Create',
          active: pathname.includes('/review/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'review-list',
          href: '/review/review-list',
          label: 'Review List',
          active: pathname.includes('/review/review-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Role Permission',
      id: 'role-permission',
      menus: [
        {
          id: 'create',
          href: '/role-permission/create',
          label: 'Create',
          active: pathname.includes('/role-permission/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'role-perm-list',
          href: '/role-permission/role-perm-list',
          label: 'Role Perm List',
          active: pathname.includes('/role-permission/role-perm-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'role-permission-list',
          href: '/role-permission/role-permission-list',
          label: 'Role Permission List',
          active: pathname.includes('/role-permission/role-permission-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Role',
      id: 'role',
      menus: [
        {
          id: 'create',
          href: '/role/create',
          label: 'Create',
          active: pathname.includes('/role/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'role-list',
          href: '/role/role-list',
          label: 'Role List',
          active: pathname.includes('/role/role-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Setting',
      id: 'setting',
      menus: [
        {
          id: 'create',
          href: '/setting/create',
          label: 'Create',
          active: pathname.includes('/setting/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'setting-list',
          href: '/setting/setting-list',
          label: 'Setting List',
          active: pathname.includes('/setting/setting-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Settings',
      id: 'settings',
      menus: [
        {
          id: 'create',
          href: '/settings/create',
          label: 'Create',
          active: pathname.includes('/settings/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'settings-list',
          href: '/settings/settings-list',
          label: 'Settings List',
          active: pathname.includes('/settings/settings-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Skill',
      id: 'skill',
      menus: [
        {
          id: 'create',
          href: '/skill/create',
          label: 'Create',
          active: pathname.includes('/skill/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'skill-list',
          href: '/skill/skill-list',
          label: 'Skill List',
          active: pathname.includes('/skill/skill-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Sms Template',
      id: 'sms-template',
      menus: [
        {
          id: 'create',
          href: '/sms-template/create',
          label: 'Create',
          active: pathname.includes('/sms-template/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'sms-template-list',
          href: '/sms-template/sms-template-list',
          label: 'Sms Template List',
          active: pathname.includes('/sms-template/sms-template-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Student Answer',
      id: 'student-answer',
      menus: [
        {
          id: 'create',
          href: '/student-answer/create',
          label: 'Create',
          active: pathname.includes('/student-answer/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'student-answer-list',
          href: '/student-answer/student-answer-list',
          label: 'Student Answer List',
          active: pathname.includes('/student-answer/student-answer-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Student Certificate',
      id: 'student-certificate',
      menus: [
        {
          id: 'create',
          href: '/student-certificate/create',
          label: 'Create',
          active: pathname.includes('/student-certificate/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'student-certificate-list',
          href: '/student-certificate/student-certificate-list',
          label: 'Student Certificate List',
          active: pathname.includes('/student-certificate/student-certificate-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Student Lesson Exam Answer',
      id: 'student-lesson-exam-answer',
      menus: [
        {
          id: 'create',
          href: '/student-lesson-exam-answer/create',
          label: 'Create',
          active: pathname.includes('/student-lesson-exam-answer/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'student-lesson-exam-answer-list',
          href: '/student-lesson-exam-answer/student-lesson-exam-answer-list',
          label: 'Student Lesson Exam Answer List',
          active: pathname.includes('/student-lesson-exam-answer/student-lesson-exam-answer-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Student',
      id: 'student',
      menus: [
        {
          id: 'create',
          href: '/student/create',
          label: 'Create',
          active: pathname.includes('/student/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'student-list',
          href: '/student/student-list',
          label: 'Student List',
          active: pathname.includes('/student/student-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Tag',
      id: 'tag',
      menus: [
        {
          id: 'create',
          href: '/tag/create',
          label: 'Create',
          active: pathname.includes('/tag/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'tag-list',
          href: '/tag/tag-list',
          label: 'Tag List',
          active: pathname.includes('/tag/tag-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ticket Department',
      id: 'ticket-department',
      menus: [
        {
          id: 'create',
          href: '/ticket-department/create',
          label: 'Create',
          active: pathname.includes('/ticket-department/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'ticket-department-list',
          href: '/ticket-department/ticket-department-list',
          label: 'Ticket Department List',
          active: pathname.includes('/ticket-department/ticket-department-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ticket Message',
      id: 'ticket-message',
      menus: [
        {
          id: 'create',
          href: '/ticket-message/create',
          label: 'Create',
          active: pathname.includes('/ticket-message/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'ticket-message-list',
          href: '/ticket-message/ticket-message-list',
          label: 'Ticket Message List',
          active: pathname.includes('/ticket-message/ticket-message-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ticket Priority',
      id: 'ticket-priority',
      menus: [
        {
          id: 'create',
          href: '/ticket-priority/create',
          label: 'Create',
          active: pathname.includes('/ticket-priority/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'ticket-priority-list',
          href: '/ticket-priority/ticket-priority-list',
          label: 'Ticket Priority List',
          active: pathname.includes('/ticket-priority/ticket-priority-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ticket Related Service',
      id: 'ticket-related-service',
      menus: [
        {
          id: 'create',
          href: '/ticket-related-service/create',
          label: 'Create',
          active: pathname.includes('/ticket-related-service/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'ticket-related-service-list',
          href: '/ticket-related-service/ticket-related-service-list',
          label: 'Ticket Related Service List',
          active: pathname.includes('/ticket-related-service/ticket-related-service-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ticket',
      id: 'ticket',
      menus: [
        {
          id: 'create',
          href: '/ticket/create',
          label: 'Create',
          active: pathname.includes('/ticket/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'ticket-list',
          href: '/ticket/ticket-list',
          label: 'Ticket List',
          active: pathname.includes('/ticket/ticket-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'User Permission',
      id: 'user-permission',
      menus: [
        {
          id: 'create',
          href: '/user-permission/create',
          label: 'Create',
          active: pathname.includes('/user-permission/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'user-perm-list',
          href: '/user-permission/user-perm-list',
          label: 'User Perm List',
          active: pathname.includes('/user-permission/user-perm-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'user-permission-list',
          href: '/user-permission/user-permission-list',
          label: 'User Permission List',
          active: pathname.includes('/user-permission/user-permission-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'User Role',
      id: 'user-role',
      menus: [
        {
          id: 'create',
          href: '/user-role/create',
          label: 'Create',
          active: pathname.includes('/user-role/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'user-role-list',
          href: '/user-role/user-role-list',
          label: 'User Role List',
          active: pathname.includes('/user-role/user-role-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Users',
      id: 'users',
      menus: [
        {
          id: 'create',
          href: '/users/create',
          label: 'Create',
          active: pathname.includes('/users/create'),
          icon: 'heroicons-user',
          submenus: [],
        },
        {
          id: 'user-list',
          href: '/users/user-list',
          label: 'User List',
          active: pathname.includes('/users/user-list'),
          icon: 'heroicons-user-group',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Zoom Setting',
      id: 'zoom-setting',
      menus: [
        {
          id: 'create',
          href: '/zoom-setting/create',
          label: 'Create',
          active: pathname.includes('/zoom-setting/create'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
        {
          id: 'zoom-list',
          href: '/zoom-setting/zoom-list',
          label: 'Zoom List',
          active: pathname.includes('/zoom-setting/zoom-list'),
          icon: 'heroicons-outline:document',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Devices",
      id: "devices",
      menus: [
        {
          id: "devices",
          href: "/device/device-list",
          label: "Device List",
          active: pathname.includes("/device/device-list"),
          icon: "heroicons:computer-desktop",
          submenus: [],
        },
        // {
        //   id: "create",
        //   href: "/device/create",
        //   label: "Add New device",
        //   active: pathname.includes("/device/create"),
        //   icon: "heroicons:computer-desktop",
        //   submenus: [],
        // },
      ],
    },
    {
      groupLabel: "User Role",
      id: "user_role",
      menus: [
        {
          id: "create",
          href: "/user-role/create",
          label: "Add New User Role",
          active: pathname.includes("/user-role/create"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "user_role",
          href: "/user-role/user-role-list",
          label: "User Role List",
          active: pathname.includes("/role/user-role-list"),
          icon: "heroicons:user-group",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Roles",
      id: "roles",
      menus: [
        {
          id: "create",
          href: "/role/create",
          label: "Add New role",
          active: pathname.includes("/role/create"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "roles",
          href: "/role/role-list",
          label: "Role List",
          active: pathname.includes("/role/role-list"),
          icon: "heroicons:user-group",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Role Permissions",
      id: "role_permissions",
      menus: [
        {
          id: "create",
          href: "/role-permission/create",
          label: "Add New permission",
          active: pathname.includes("/role-permission/create"),
          icon: "heroicons:lock-closed",
          submenus: [],
        },
        {
          id: "role_permissions",
          href: "/role-permission/role-perm-list",
          label: "Role Permission List",
          active: pathname.includes("/role-permission/role-perm-list"),
          icon: "heroicons:lock-closed",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "User Permissions",
      id: "user_permissions",
      menus: [
        {
          id: "create",
          href: "/user-permission/create",
          label: "Add New User Permission",
          active: pathname.includes("/user-permission/create"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "user_permissions",
          href: "/user-permission/user-perm-list",
          label: "User Permission List",
          active: pathname.includes("/user-permission/user-perm-list"),
          icon: "heroicons:user-group",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      id: "settings",
      menus: [
        {
          id: "settings",
          href: "/settings/settings-list",
          label: "Settings List",
          active: pathname.includes("/settings/settings-list"),
          icon: "heroicons:cog",
          submenus: [],
        },
      ],
    },
  ];
}
export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard/analytics",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard/analytics",
              label: "Analytics",
              active: pathname === "/dashboard/analytics",
              icon: "heroicons:arrow-trending-up",
              children: [],
            },
            {
              href: "/dashboard/dash-ecom",
              label: "Ecommerce",
              active: pathname === "/dashboard/dash-ecom",
              icon: "heroicons:shopping-cart",
              children: [],
            },
            {
              href: "/dashboard/project",
              label: "Project",
              active: pathname === "/dashboard/project",
              icon: "heroicons:document",
              children: [],
            },
            {
              href: "/dashboard/crm",
              label: "Crm",
              active: pathname === "/dashboard/crm",
              icon: "heroicons:share",
              children: [],
            },
            {
              href: "/dashboard/banking",
              label: "Banking",
              active: pathname === "/dashboard/banking",
              icon: "heroicons:credit-card",
              children: [],
            },
          ],
        },
      ],
    },

    {
      groupLabel: t("apps"),
      id: "app",
      menus: [
        {
          id: "app",
          href: "/app/chat",
          label: "Apps",
          active: pathname.includes("/app/chat"),
          icon: "heroicons-outline:chat",
          submenus: [
            {
              href: "/app/chat",
              label: "Chat",
              active: pathname === "/app/chat",
              icon: "heroicons-outline:chat",
              children: [],
            },
            {
              href: "/app/email",
              label: "Email",
              active: pathname === "/app/email",
              icon: "heroicons-outline:mail",
              children: [],
            },
            {
              href: "/app/kanban",
              label: "Kanban",
              active: pathname === "/app/kanban",
              icon: "heroicons-outline:view-boards",
              children: [],
            },
            {
              href: "/app/calendar",
              label: "Calendar",
              active: pathname === "/app/calendar",
              icon: "heroicons-outline:calendar",
              children: [],
            },
            {
              href: "/app/todo",
              label: "Todo",
              active: pathname === "/app/todo",
              icon: "heroicons-outline:clipboard-check",
              children: [],
            },
            {
              href: "/app/projects",
              label: "Projects",
              active: pathname === "/app/projects",
              icon: "heroicons-outline:document",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: t("ecommerce"),
      id: "ecommerce",
      menus: [
        {
          id: "ecommerce",
          href: "/ecommerce/frontend",
          label: "Ecommerce",
          active: pathname.includes("/ecommerce"),
          icon: "heroicons-outline:shopping-bag",
          submenus: [
            {
              href: "/ecommerce/frontend",
              label: "Userapp",
              active: pathname === "/ecommerce/frontend",
              icon: "heroicons-outline:user",
              children: [
                {
                  href: "/ecommerce/frontend",
                  label: "Products",
                  active: pathname === "/ecommerce/frontend",
                },
                {
                  href: "/ecommerce/frontend/c06d48bf-7f35-4789-b71e-d80fee5b430t",
                  label: "Productdetails",
                  active:
                    pathname ===
                    "/ecommerce/frontend/c06d48bf-7f35-4789-b71e-d80fee5b430t",
                },
                {
                  href: "/ecommerce/frontend/checkout/cart",
                  label: "Cart",
                  active: pathname === "/ecommerce/frontend/checkout/cart",
                },
                {
                  href: "/ecommerce/frontend/wishlist",
                  label: "Wishlist",
                  active: pathname === "/ecommerce/frontend/wishlist",
                },
              ],
            },
            {
              href: "/ecommerce/backend",
              label: "Adminapp",
              active: pathname === "/ecommerce/backend",
              icon: "heroicons-outline:user-circle",
              children: [
                {
                  href: "/ecommerce/backend/add-product",
                  label: "Addproduct",
                  active: pathname === "/ecommerce/backend/add-product",
                },
                {
                  href: "/ecommerce/backend/customer-list",
                  label: "Customerlist",
                  active: pathname === "/ecommerce/backend/customer-list",
                },
                {
                  href: "/ecommerce/backend/edit-product",
                  label: "Editproduct",
                  active: pathname === "/ecommerce/backend/edit-product",
                },
                {
                  href: "/ecommerce/backend/invoice",
                  label: "Invoice",
                  active: pathname === "/ecommerce/backend/invoice",
                },
                {
                  href: "/ecommerce/backend/order-details",
                  label: "Orderdetails",
                  active: pathname === "/ecommerce/backend/order-details",
                },
                {
                  href: "/ecommerce/backend/order-list",
                  label: "Orderlist",
                  active: pathname === "/ecommerce/backend/order-list",
                },
                {
                  href: "/ecommerce/backend/purchase-list",
                  label: "Purchaselist",
                  active: pathname === "/ecommerce/backend/purchase-list",
                },
                {
                  href: "/ecommerce/backend/sellers",
                  label: "Sellers",
                  active: pathname === "/ecommerce/backend/sellers",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      groupLabel: t("pages"),
      id: "auth",
      menus: [
        {
          id: "auth",
          href: "/auth/login",
          label: "Authentication",
          active: pathname.includes("/auth"),
          icon: "heroicons-outline:lock-closed",
          submenus: [
            {
              href: "/auth/login",
              label: "Signinone",
              active: pathname === "/auth/login",
              icon: "",
              children: [],
            },
            {
              href: "/auth/login2",
              label: "Signintwo",
              active: pathname === "/auth/login2",
              icon: "",
              children: [],
            },
            {
              href: "/auth/login3",
              label: "Signinthree",
              active: pathname === "/auth/login3",
              icon: "",
              children: [],
            },
            {
              href: "/auth/register",
              label: "Signupone",
              active: pathname === "/auth/register",
              icon: "",
              children: [],
            },
            {
              href: "/auth/register2",
              label: "Signuptwo",
              active: pathname === "/auth/register2",
              icon: "",
              children: [],
            },
            {
              href: "/auth/register3",
              label: "Signupthree",
              active: pathname === "/auth/register3",
              icon: "",
              children: [],
            },
            {
              href: "/auth/forgot-password",
              label: "Forgotpasswordone",
              active: pathname === "/auth/forgot-password",
              icon: "",
              children: [],
            },
            {
              href: "/auth/forgot-password2",
              label: "Forgotpasswordtwo",
              active: pathname === "/auth/forgot-password2",
              icon: "",
              children: [],
            },
            {
              href: "/auth/forgot-password3",
              label: "Forgotpasswordthree",
              active: pathname === "/auth/forgot-password3",
              icon: "",
              children: [],
            },
            {
              href: "/auth/look-screen",
              label: "Lockscreenone",
              active: pathname === "/auth/look-screen",
              icon: "",
              children: [],
            },
            {
              href: "/auth/look-screen",
              label: "Lockscreentwo",
              active: pathname === "/auth/look-screen2",
              icon: "",
              children: [],
            },
            {
              href: "/auth/look-screen3",
              label: "Lockscreenthree",
              active: pathname === "/auth/look-screen3",
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: t("elements"),
      id: "components",
      menus: [
        {
          id: "components",
          href: "/components/avatar",
          label: "Components",
          active: pathname.includes("/components"),
          icon: "heroicons-outline:collection",
          submenus: [
            {
              href: "/components/avatar",
              label: "Avatar",
              active: pathname === "/components/avatar",
              icon: "",
              children: [],
            },
            {
              href: "/components/alert",
              label: "Alert",
              active: pathname === "/components/alert",
              icon: "",
              children: [],
            },
            {
              href: "/components/alert-dialog",
              label: "Alertdialog",
              active: pathname === "/components/alert-dialog",
              icon: "",
              children: [],
            },
            {
              href: "/components/accordion",
              label: "Accordion",
              active: pathname === "/components/accordion",
              icon: "",
              children: [],
            },
            {
              href: "/components/badge",
              label: "Badge",
              active: pathname === "/components/badge",
              icon: "",
              children: [],
            },
            {
              href: "/components/breadcrumb",
              label: "Breadcrumb",
              active: pathname === "/components/breadcrumb",
              icon: "",
              children: [],
            },
            {
              href: "/components/button",
              label: "Button",
              active: pathname === "/components/button",
              icon: "",
              children: [],
            },
            {
              href: "/components/calendar",
              label: "Calendar",
              active: pathname === "/components/calendar",
              icon: "",
              children: [],
            },
            {
              href: "/components/card",
              label: "Card",
              active: pathname === "/components/card",
              icon: "",
              children: [],
            },
            {
              href: "/components/carousel",
              label: "Carousel",
              active: pathname === "/components/carousel",
              icon: "",
              children: [],
            },
            {
              href: "/components/collapsible",
              label: "Collapsible",
              active: pathname === "/components/collapsible",
              icon: "",
              children: [],
            },
            {
              href: "/components/context-menu",
              label: "Contextmenu",
              active: pathname === "/components/context-menu",
              icon: "",
              children: [],
            },
            {
              href: "/components/dialog",
              label: "Dialog",
              active: pathname === "/components/dialog",
              icon: "",
              children: [],
            },
            {
              href: "/components/drawer",
              label: "Drawer",
              active: pathname === "/components/drawer",
              icon: "",
              children: [],
            },
            {
              href: "/components/dropdown",
              label: "Dropdown",
              active: pathname === "/components/dropdown",
              icon: "",
              children: [],
            },
            {
              href: "/components/hover-card",
              label: "Hovercard",
              active: pathname === "/components/hover-card",
              icon: "",
              children: [],
            },
            {
              href: "/components/menu-bar",
              label: "Menubar",
              active: pathname === "/components/menu-bar",
              icon: "",
              children: [],
            },
            {
              href: "/components/navigation-menu",
              label: "Navigationmenu",
              active: pathname === "/components/navigation-menu",
              icon: "",
              children: [],
            },
            {
              href: "/components/pagination",
              label: "Pagination",
              active: pathname === "/components/pagination",
              icon: "",
              children: [],
            },
            {
              href: "/components/popover",
              label: "Popover",
              active: pathname === "/components/popover",
              icon: "",
              children: [],
            },
            {
              href: "/components/progress",
              label: "Progress",
              active: pathname === "/components/progress",
              icon: "",
              children: [],
            },
            {
              href: "/components/resizable",
              label: "Resizable",
              active: pathname === "/components/resizable",
              icon: "",
              children: [],
            },
            {
              href: "/components/scroll-area",
              label: "Scrollarea",
              active: pathname === "/components/scroll-area",
              icon: "",
              children: [],
            },
            {
              href: "/components/separator",
              label: "Separator",
              active: pathname === "/components/separator",
              icon: "",
              children: [],
            },
            {
              href: "/components/sheet",
              label: "Sheet",
              active: pathname === "/components/sheet",
              icon: "",
              children: [],
            },
            {
              href: "/components/skeleton",
              label: "Skeleton",
              active: pathname === "/components/skeleton",
              icon: "",
              children: [],
            },
            {
              href: "/components/sonner",
              label: "Sonner",
              active: pathname === "/components/sonner",
              icon: "",
              children: [],
            },
            {
              href: "/components/tabs",
              label: "Tabs",
              active: pathname === "/components/tabs",
              icon: "",
              children: [],
            },
            {
              href: "/components/toast",
              label: "Toast",
              active: pathname === "/components/toast",
              icon: "",
              children: [],
            },
            {
              href: "/components/toggle",
              label: "Toggle",
              active: pathname === "/components/toggle",
              icon: "",
              children: [],
            },
            {
              href: "/components/tooltip",
              label: "Tooltip",
              active: pathname === "/components/tooltip",
              icon: "",
              children: [],
            },
            {
              href: "/components/typography",
              label: "Typography",
              active: pathname === "/components/typography",
              icon: "",
              children: [],
            },
            {
              href: "/components/colors",
              label: "Colors",
              active: pathname === "/components/colors",
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "forms",
      menus: [
        {
          id: "forms",
          href: "/forms/input",
          label: "Forms",
          active: pathname.includes("/forms"),
          icon: "heroicons-outline:clipboard-list",
         submenus: [
            {
              href: "/forms/input",
              label: "Input",
              active: pathname === "/forms/input",
              icon: "",
              children: [],
            },
            {
              href: "/forms/input-group",
              label: "Inputgroup",
              active: pathname === "/forms/input-group",
              icon: "",
              children: [],
            },
            {
              href: "/forms/input-layout",
              label: "Inputlayout",
              active: pathname === "/forms/input-layout",
              icon: "",
              children: [],
            },
            {
              href: "/forms/input-mask",
              label: "Inputmask",
              active: pathname === "/forms/input-mask",
              icon: "",
              children: [],
            },
            {
              href: "/forms/input-otp",
              label: "Inputotp",
              active: pathname === "/forms/input-otp",
              icon: "",
              children: [],
            },
            {
              href: "/forms/input-file",
              label: "Inputfile",
              active: pathname === "/forms/input-file",
              icon: "",
              children: [],
            },
            {
              href: "/forms/form-validation",
              label: "Formvalidation",
              active: pathname === "/forms/form-validation",
              icon: "",
              children: [],
            },
            {
              href: "/forms/select",
              label: "Select",
              active: pathname === "/forms/select",
              icon: "",
              children: [],
            },
            {
              href: "/forms/react-select",
              label: "Reactselect",
              active: pathname === "/forms/react-select",
              icon: "",
              children: [],
            },
            {
              href: "/forms/slider",
              label: "Slider",
              active: pathname === "/forms/slider",
              icon: "",
              children: [],
            },
            {
              href: "/forms/switch",
              label: "Switch",
              active: pathname === "/forms/switch",
              icon: "",
              children: [],
            },
            {
              href: "/forms/radio",
              label: "Radio",
              active: pathname === "/forms/radio",
              icon: "",
              children: [],
            },
            {
              href: "/forms/checkbox",
              label: "Checkbox",
              active: pathname === "/forms/checkbox",
              icon: "",
              children: [],
            },

            {
              href: "/forms/combobox",
              label: "Combobox",
              active: pathname === "/forms/combobox",
              icon: "",
              children: [],
            },
            {
              href: "/forms/command",
              label: "Command",
              active: pathname === "/forms/command",
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "table",
      menus: [
        {
          id: "table",
          href: "/table/basic-table",
          label: "Table",
          active: pathname.includes("/table"),
          icon: "heroicons:table-cells",
          submenus: [
            {
              href: "/table/basic-table",
              label: "Basictable",
              active: pathname === "/table/basic-table",
              icon: "",
              children: [],
            },
            {
              href: "/table/react-table",
              label: "Reacttable",
              active: pathname === "/table/react-table",
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "charts",
      menus: [
        {
          id: "charts",
          href: "/charts/appex-charts/charts-appex-area",
          label: "Chart",
          active: pathname.includes("/charts"),
          icon: "heroicons:chart-bar",
          submenus: [
            {
              href: "/charts/appex-charts/charts-appex-area",
              label: "Appexcharts",
              active: pathname.includes("/charts/appex-charts"),
              icon: "",
              children: [
                {
                  href: "/charts/appex-charts/charts-appex-area",
                  label: "Areacharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-area"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-bar",
                  label: "Barcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-bar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-boxplot",
                  label: "Boxplotcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-boxplot"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-bubble",
                  label: "Bubblecharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-bubble"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-candlestick",
                  label: "Candlestickcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-candlestick"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-column",
                  label: "Columncharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-column"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-combo",
                  label: "Combocharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-combo"
                  ),
                  children: [],
                },

                {
                  href: "/charts/appex-charts/charts-appex-funnel",
                  label: "Funnelcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-funnel"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-heatmap",
                  label: "Heatmapcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-heatmap"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-line",
                  label: "Linecharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-line"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-pie",
                  label: "Piecharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-pie"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-polararea",
                  label: "Ploarareacharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-polararea"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-radar",
                  label: "Radarcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-radar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-radialbars",
                  label: "Radialbarcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-radialbars"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-range",
                  label: "Rangecharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-range"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-scatter",
                  label: "Scattercharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-scatter"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-timeline",
                  label: "Timelinecharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-timeline"
                  ),
                  children: [],
                },
                {
                  href: "/charts/appex-charts/charts-appex-treemap",
                  label: "Treemapcharts",
                  active: pathname.includes(
                    "/charts/appex-charts/charts-appex-treemap"
                  ),
                  children: [],
                },
              ],
            },
            {
              href: "/charts/rechart/charts-rechart-area",
              label: "Rechart",
              active: pathname.includes("/charts/rechart"),
              icon: "",
              children: [
                {
                  href: "/charts/rechart/charts-rechart-area",
                  label: "Areacharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-area"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-bar",
                  label: "Barcharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-bar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-composed",
                  label: "Composedcharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-composed"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-line",
                  label: "Linecharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-line"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-pie",
                  label: "Piecharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-pie"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-radar",
                  label: "Radarcharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-radar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-radialbar",
                  label: "Radialbarcharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-radialbar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-scatter",
                  label: "Scattercharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-scatter"
                  ),
                  children: [],
                },
                {
                  href: "/charts/rechart/charts-rechart-treemap",
                  label: "Treemapcharts",
                  active: pathname.includes(
                    "/charts/rechart/charts-rechart-treemap"
                  ),
                  children: [],
                },
              ],
            },
            {
              href: "/charts/chart-js/charts-chartjs-area",
              label: "Chartjs",
              active: pathname.includes("/charts/chart-js"),
              icon: "",
              children: [
                {
                  href: "/charts/chart-js/charts-chartjs-area",
                  label: "Areacharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-area"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-bar",
                  label: "Barcharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-bar"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-line",
                  label: "Linecharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-line"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-animations",
                  label: "Animationcharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-animations"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-legend",
                  label: "Legendcharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-legend"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-scaleoptions",
                  label: "Scaleoptioncharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-scaleoptions"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-scales",
                  label: "Scalecharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-scales"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-scriptable",
                  label: "Scriptablecharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-scriptable"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-title",
                  label: "Titlecharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-title"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-tooltip",
                  label: "Tooltipchart",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-tooltip"
                  ),
                  children: [],
                },
                {
                  href: "/charts/chart-js/charts-chartjs-other",
                  label: "Othercharts",
                  active: pathname.includes(
                    "/charts/chart-js/charts-chartjs-other"
                  ),
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "maps",
      menus: [
        {
          id: "maps",
          href: "/maps/maps-leaflet",
          label: "Maps",
          active: pathname.includes("/maps/maps-leaflet"),
          icon: "heroicons-outline:map",
          submenus: [
            {
              href: "/maps/maps-leaflet",
              label: "Mapsleaflet",
              active: pathname.includes("/maps/maps-leaflet"),
              icon: "",
              children: [],
            },
            {
              href: "/maps/maps-vector",
              label: "Mapsvector",
              active: pathname.includes("/maps/maps-vector"),
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "icons",
      menus: [],
    },
  ];
}


