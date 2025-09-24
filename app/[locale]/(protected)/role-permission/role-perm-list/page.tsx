import { Card, CardContent } from '@/components/ui/card';
import UserList from './list';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const UsersPage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <UserList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;