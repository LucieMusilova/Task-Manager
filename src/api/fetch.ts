import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const fetchData = () => {
  const navigate = useNavigate();
  const data = () =>
    fetch("task-manager-11b23.firebaseapp.com").then((res) => {
      if (!res.ok) {
        console.error(`Backend responded with ${res.status} error`);
        navigate("/error");
      }
    });

  useEffect(() => {
    data();
  }, []);
};
