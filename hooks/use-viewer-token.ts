import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

// * hostIdentity = Identity of streamer

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  console.log("hostIdentity: ", hostIdentity);
  

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const tokenName = decodedToken?.name;
        const tokenIdentity = decodedToken?.sub;
        
        if (tokenIdentity) {
          setIdentity(tokenIdentity);
        }

        if (tokenName) {
          setName(tokenName);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    name,
    token,
    identity,
  };
};
