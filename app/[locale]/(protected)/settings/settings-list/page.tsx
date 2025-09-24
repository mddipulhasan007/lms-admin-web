import { Card, CardContent } from '@/components/ui/card';
import ZoomSettingList from './list';
import SiteBreadcrumb from '@/components/site-breadcrumb';

const ZoomSettingPage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className='space-y-6'>
        <Card>
          <CardContent className="p-0">
            <ZoomSettingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZoomSettingPage;