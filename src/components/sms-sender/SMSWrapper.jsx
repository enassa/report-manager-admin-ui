export const SMSProviderWrapper = (WrappedComponent) => {
  const WrappedWithWrapper = (props) => {
    // Your wrapper logic here
    return <WrappedComponent {...props} />;
  };
  return WrappedWithWrapper;
};
