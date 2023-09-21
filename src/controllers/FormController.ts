import { Dispatch } from "react";
import { setMode } from "../store/slices/registration-slice";
import { AnyAction } from "redux";


const submitForm = async (data: IFormData, dispatch: Dispatch<AnyAction>) => {
    const formData = new FormData();
    const handleDate = (date: string | number | Date) => {
        return new Date(date).toLocaleString("ru", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const participants = data.participants.map((p, i) => {
        return `${i + 1}. ${p.lastName} ${p.firstName} ${p.middleName}, ${handleDate(p.birthDay)}р.; `;
    });

    formData.append("date", handleDate(data.route.date));
    formData.append("days", JSON.stringify(data.route.days));
    formData.append("lastName", data.contact.lastName);
    formData.append("firstName", data.contact.firstName);
    formData.append("phone", data.contact.phoneNumber);
    formData.append("email", data.contact.email);
    formData.append("city", data.contact.city);
    formData.append("participants", JSON.stringify(participants));
    formData.append("comment", data.comment);

    dispatch(setMode('loading'));
    try {
        await fetch("sendmail.php", { method: "POST", body: formData }).then(res=>{
            console.log("result: ",res)
            dispatch(setMode('success'));
        })
    } catch (e){
        dispatch(setMode('error'));
        console.error("Ошибка при отправке формы:", e);
    }
}

export default submitForm