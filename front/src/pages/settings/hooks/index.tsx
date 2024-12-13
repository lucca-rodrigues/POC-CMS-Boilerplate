import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SettingsServices } from "@root/domain/settings";

export default function useSettings() {  
  const service = new SettingsServices();
  const [pageData, setPageData] = useState()

  const navigate = useNavigate(); 
  const { control, handleSubmit, watch, setValue } = useForm();
  const watchFields = watch();

  const [isLoading, setIsLoading] = useState(false); 

  async function getSettings() {
    const response = await service.get();
    setPageData(response);
  }

  return { 
    isLoading, 
    setIsLoading,
    control, 
    handleSubmit, 
    watch, 
    setValue, 
    watchFields,
    navigate,
    getSettings,
    pageData
  }; 
}