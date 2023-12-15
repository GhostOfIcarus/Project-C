import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

export function useCompaniesOverviewController() {
    const [companies, setCompanies] = useState([]);

    const GetAllCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/company/allcompanies', {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (response.data) {
              const companiesData = response.data.map((company: { id: any; company_name: any; }) => ({
                id: company.id,
                name: company.company_name
              }));
              setCompanies(companiesData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const RemoveCompany = async (id: number) => {
      const company_id = id;
      try {
          const response = await axios({
              method: 'delete',
              url: 'http://localhost:5000/api/company/delete',
              data: {
                company_id
              },
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (response.data) {
              console.log(response.data);
          }
      } catch (error) {
          console.log(error);
      }
    };

    return { GetAllCompanies, RemoveCompany, companies };
}