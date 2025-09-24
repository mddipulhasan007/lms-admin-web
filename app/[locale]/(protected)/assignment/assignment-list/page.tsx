import { Card, CardContent } from '@/components/ui/card';
import AssignmentList from './list';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const ArchiveVideoPage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <AssignmentList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArchiveVideoPage;