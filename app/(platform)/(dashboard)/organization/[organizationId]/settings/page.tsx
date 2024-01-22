import { OrganizationProfile } from "@clerk/nextjs";

const Settings = () => {
    return ( 
        <div className="w-full">
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            width: "100%",
                            boxShadow: "none",
                        },
                        card: {
                            border: "1px solid #efefef",
                            width: "100%",
                            boxShadow : "none"
                        }
                  }
              }}
            />
           
        </div>
     );
}
 
export default Settings;