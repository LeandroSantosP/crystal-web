interface  ErrorMessageProps{

}

export const ErrorMessage = ({ children, xs = false}: { children: string, xs?: boolean }) => (
  <p className={`absolute bottom-[-1px] ${!xs ? "text-sm": "text-xs"} text-gray-100`}>{children}</p>
);
