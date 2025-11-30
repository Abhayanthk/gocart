import StoreLayout from "@/components/store/StoreLayout";
import StoreAuthProvider from "./storeAuthProvider";

export const metadata = {
  title: "GoCart. - Store Dashboard",
  description: "GoCart. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {
  return (
    <>
      <StoreAuthProvider>
        <StoreLayout>{children}</StoreLayout>
      </StoreAuthProvider>
    </>
  );
}
