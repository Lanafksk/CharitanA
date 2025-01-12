const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const INTERNAL_API = 'http://localhost:4000/api/projects';

const projects = [
    {
        category: 'Humanitarian',
        charity_id: 'c03b61f3-c5d7-4fb2-8f7e-41312000782d',
        title: 'Middle East Crisis',
        target_amount: 500000,
        current_amount: 0,
        description: 'Providing aid and support in the Middle East crisis.',
        status: 'Active',
        start_date: "2025-01-10T00:00:00.000+00:00",
        end_date: "2025-03-25T00:00:00.000+00:00",
        region: 'Middle East',
        country: 'Israel',
    },
    {
        category: 'Humanitarian',
        charity_id: '479feae3-08af-45c6-b0c1-b10847df79f8',
        title: 'Ukraine - Russia War Support',
        target_amount: 1000000,
        current_amount: 0,
        description: 'Providing support for those affected by the Ukraine-Russia war.',
        status: 'Active',
        start_date: "2025-02-10T00:00:00.000+00:00",
        end_date: "2025-10-10T00:00:00.000+00:00",
        region: 'Europe',
        country: 'Ukraine',
    },
    {
        category: 'Food',
        charity_id: '7b221749-2a0e-40d7-8b3e-28d3807db94c',
        title: 'Food Program in South Africa',
        target_amount: 300000,
        current_amount: 0,
        description: 'Feeding communities in South Africa and neighboring countries.',
        status: 'Active',
        start_date: "2024-05-10T00:00:00.000+00:00",
        end_date: "2025-05-15T00:00:00.000+00:00",
        region: 'Africa',
        country: 'South Africa',
    },
    {
        category: 'Environment',
        charity_id: '3dedc9cf-b6f3-463d-9179-0f5ba981a6f0',
        title: 'Yagi Typhoon Support',
        target_amount: 100000,
        current_amount: 0,
        description: 'Helping rebuild lives after the Yagi Typhoon in Vietnam.',
        status: 'Active',
        start_date: "2024-12-12T00:00:00.000+00:00",
        end_date: "2025-06-26T00:00:00.000+00:00",
        region: 'Asia',
        country: 'Vietnam',
    },
    {
        category: 'Environment',
        charity_id: '98881b26-bfdb-47ab-b706-88efea0ad358',
        title: 'Milton Hurricane Support',
        target_amount: 200000,
        current_amount: 0,
        description: 'Supporting victims of the Milton Hurricane in the USA.',
        status: 'Active',
        start_date: "2025-01-12T00:00:00.000+00:00",
        end_date: "2025-05-22T00:00:00.000+00:00",
        region: 'North America',
        country: 'USA',
    },
    {
        category: 'Humanitarian',
        charity_id: '0c71d62e-be27-4c7a-8c5c-4acf3b50736f',
        title: 'Helping Ukrainian Refugees in Germany',
        target_amount: 500000,
        current_amount: 0,
        description: 'Providing shelter and aid to Ukrainian refugees in Germany.',
        status: 'Active',
        start_date: "2024-01-12T00:00:00.000+00:00",
        end_date: "2025-01-22T00:00:00.000+00:00",
        region: 'Europe',
        country: 'Germany',
    },
    {
        project_id: uuidv4(),
        category: 'Education',
        charity_id: '0c71d62e-be27-4c7a-8c5c-4acf3b50736f',
        title: "Supporting SOS Children's Village in China",
        target_amount: 300000,
        current_amount: 0,
        description: 'Improving education and housing for children in China.',
        status: 'Active',
        start_date: "2025-01-02T00:00:00.000+00:00",
        end_date: "2025-09-10T00:00:00.000+00:00",
        region: 'Asia',
        country: 'China',
    },
];

exports.generateProjects = async () => {
    try {
        for (let project of projects) {
            const newProject = await axios.post(INTERNAL_API, project);
            console.log('Project created:', newProject.data);
        }
    }
    catch (err) {
        console.log(err);
    }
};