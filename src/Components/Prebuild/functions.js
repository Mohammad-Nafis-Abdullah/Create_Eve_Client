import { toast } from "react-toastify";

const errorMssg = (error = null) => {
    if (error) {
        toast.error(error?.code?.split("/")[1].split("-").join(" "),{theme:'colored'})
    }
    return 0;
};

export { errorMssg };