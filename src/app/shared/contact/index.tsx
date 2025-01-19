import dayjs from 'dayjs';
import ContactWidget from './contact/list';

const thisMonth = dayjs(new Date()).format('MMMM YYYY');

export default function ContactDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <ContactWidget
          title="Contact List"
          description={`Summary of contact list of ${thisMonth}`}
          className="col-span-full"
        />
      </div>
    </div>
  );
}
