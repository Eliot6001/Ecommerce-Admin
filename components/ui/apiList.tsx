"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import { AlertApi } from "./alertApi";

interface ApiLIstProps {
  entityName: string;
  entityIdName: string;
}
const ApiList: React.FC<ApiLIstProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origins = useOrigin();
  const baseURL = `${origins}/api/${params.storeId}`;
  return (
    <>
      <AlertApi
        title="GET"
        variant="public"
        description={`${baseURL}/${entityName}`}
      />
      <AlertApi
        title="GET"
        variant="public"
        description={`${baseURL}/${entityName}/[${entityIdName}]`}
      />
      <AlertApi
        title="POST"
        variant="admin"
        description={`${baseURL}/${entityName}`}
      />
      <AlertApi
        title="PATCH"
        variant="admin"
        description={`${baseURL}/${entityName}`}
      />
      <AlertApi
        title="DELETE"
        variant="admin"
        description={`${baseURL}/${entityName}`}
      />
    </>
  );
};

export default ApiList;
