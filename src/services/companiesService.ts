import { $api, $apiPrivate } from "../common/api";
import {
  IAddCompanyFields,
  ICompany,
  IContact,
  IResults,
  IWorkSchedule,
} from "../types/types";

interface IAddCompanyBody extends Omit<IAddCompanyFields, "image"> {
  image: File;
}

interface IAddContactBody {
  title: string;
  value: string;
  company: number;
}

interface IAddWorkScheduleBody extends IWorkSchedule {
  company: number;
}

class CompaniesService {
  getAll() {
    return $api<IResults<ICompany>>("companies/all/", {
      params: { limit: 10 },
    });
  }
  getContacts(companyId: number) {
    return $api<IResults<IContact>>(`companies/${companyId}/contact/all/`);
  }
  getById(id: number) {
    return $api<ICompany>(`companies/${id}/`);
  }
  addCompany(body: IAddCompanyBody) {
    return $apiPrivate.post<ICompany>("companies/create/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  addContact(body: IAddContactBody) {
    return $apiPrivate.post(`companies/${body.company}/contact/create/`, body);
  }
  addWorkSchedule(body: IAddWorkScheduleBody) {
    return $apiPrivate.post(`companies/work_schedule/create/`, body);
  }
}

export default new CompaniesService();
