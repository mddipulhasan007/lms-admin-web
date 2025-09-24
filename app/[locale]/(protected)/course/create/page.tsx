import { Card, CardContent } from '@/components/ui/card';
import CourseCreateForm from './CreateForm';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const CreateCoursePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <CourseCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCoursePage;