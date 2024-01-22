import { OrganizationList } from "@clerk/nextjs";

const OrganizatonPage = () => { 
    return (
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl="/organization/:id"
        afterCreateOrganizationUrl="/organization/:id"
      />
    );
}

export default OrganizatonPage;