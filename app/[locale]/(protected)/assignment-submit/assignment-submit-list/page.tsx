import { Card, CardContent } from '@/components/ui/card';
import AssignmentSubmitList from './list';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const ArchiveVideoPage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <AssignmentSubmitList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArchiveVideoPage;