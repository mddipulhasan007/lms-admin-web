import { Card, CardContent } from '@/components/ui/card';
import ZoomCreateForm from './CreateForm';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const ZoomCreatePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <ZoomCreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZoomCreatePage;