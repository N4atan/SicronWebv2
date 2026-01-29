import { api, AxiosHandleError } from "./api";
import { DonationPayload } from "../interfaces";

export const createDonation = async (payload: DonationPayload): Promise<boolean> => {
    try {
        await api.post('/donations', payload);
        return true;
    } catch (error) {
        AxiosHandleError(error, 'Erro ao realizar doação');
        return false;
    }
};
