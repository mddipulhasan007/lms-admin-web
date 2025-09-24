import { Card, CardContent } from '@/components/ui/card';
import VideoCreateForm from './CreateForm';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const UsersCreatePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <VideoCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersCreatePage;