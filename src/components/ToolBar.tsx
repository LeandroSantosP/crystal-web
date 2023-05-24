import { ButtonToolBar } from './Buttons/ButtonToolBar';

export const ToolBar = () => {
  return (
    <div className="flex h-14 w-full items-center justify-start gap-1">
      <ButtonToolBar className="rounded-md border-2 border-gray-700 bg-gray-800 p-2">
        All products
      </ButtonToolBar>
      <ButtonToolBar className="rounded-md border-2 border-gray-700 bg-gray-800 p-2">
        Clothes
      </ButtonToolBar>
      <ButtonToolBar className="rounded-md border-2 border-gray-700 bg-gray-800 p-2">
        Technology
      </ButtonToolBar>
    </div>
  );
};
