import { toast } from "react-toastify";
import styles from "../components/Toast/Toast.module.scss";

export function displayToast(
  variant: "warn" | "error" | "success" | "info",
  title?: string,
  subtitle?: string
): void {
  const CustomToast = () => (
    <div className={styles["toast-message-body"]}>
      <p>
        <strong>{title ?? ""}</strong>
      </p>
      <p>{subtitle ?? ""}</p>
    </div>
  );
  switch (variant) {
    case "warn":
      toast.warn(<CustomToast />);
      break;
    case "success":
      toast.success(<CustomToast />);
      break;
    case "error":
      toast.error(<CustomToast />);
      break;
    case "info":
      toast.info(<CustomToast />);
      break;
  }
}
