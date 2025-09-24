import { Card, CardContent } from '@/components/ui/card';
import UserEditForm from './EditForm';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const UsersCreatePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <UserEditForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersCreatePage;