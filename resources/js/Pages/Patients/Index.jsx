import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "@/Components/Table";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PatientsPage = ({ auth, patients, filters }) => {
    const [search] = useState(filters.search);
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    // Search API (No debounce added for now)
    const handleSearch = (e) => {
        router.visit("/patients", {
            method: "get",
            data: { search: e.target.value },
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Patients" />

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-300">Patients</h2>
                <Link href={route("patients.create")} className="btn">
                    Add Patient
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                <input
                    onChange={handleSearch}
                    type="search"
                    name="search"
                    defaultValue={search}
                    placeholder="Search name..."
                    className="bg-gray-900 rounded-md max-w-sm text-gray-400"
                />
                <DataTable columns={columns} data={patients} />
            </div>
        </AuthenticatedLayout>
    );
};

export default PatientsPage;
