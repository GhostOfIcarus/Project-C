import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useEmployeesOverviewController } from '../Controllers/Employees_OverviewController';

export interface EmployeeSchedule{

}

export function useEmpWeekOverviewController(){
    const{ fetchEmployees, employees, RemoveEmployee } = useEmployeesOverviewController();
    console.log(employees);

    // try {
    //     const respons = await axios.post()
    // } catch (error) {
        
    // }
    return{
        fetchEmployees,
        employees
    }
}

