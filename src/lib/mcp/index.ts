import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listEnquiriesTool from "./tools/list-enquiries";
import updateEnquiryTool from "./tools/update-enquiry";
import listServicesTool from "./tools/list-services";

const projectRef =
  import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "kenton-pharmacy-clinic",
  title: "Kenton Pharmacy Clinic",
  version: "0.1.0",
  instructions:
    "Tools for Newcastle Pharmacy Clinic (Kenton and Chillingham Road branches in Newcastle upon Tyne). Use `list_services` for both branches' NHS services, private treatments, opening hours and contact details. Signed-in pharmacy staff can use `list_enquiries` and `update_enquiry` to review and manage patient register-interest enquiries across branches.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServicesTool, listEnquiriesTool, updateEnquiryTool],
});
