import { Card, CardContent } from '@/components/ui/card';
import SettingForm from './CreateForm';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const ZoomCreatePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <SettingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZoomCreatePage;