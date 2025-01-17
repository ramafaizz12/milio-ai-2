import AgentWidget from './list';
import ModalButton from '../modal-button';
import AgentForm from './agent-form';

export default function AgentDashboard() {
  return (
    <div className="@container">
      <ModalButton
        label="Create Agent"
        view={<AgentForm />}
        customSize="1000px"
        className="mb-3 mt-0 w-full @lg:w-auto"
      />
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <AgentWidget
          title="Agent Management"
          description={`Agent List`}
          className="col-span-full"
        />
      </div>
    </div>
  );
}
