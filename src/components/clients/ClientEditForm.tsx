import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import { Client } from "@/database/dao/clientsDAO";
import { registerClient, updateClient } from "@/server-actions/clientsActions";
import { v4 } from "uuid";

type Props = {
	client: Client | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function ClientEditForm({ client, onCancel, onDone }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		id: client?.id.toString(),
		name: client?.name,
		token: client?.token,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (!formData.name) {
			window.alert("Client name should not be empty!"); // TODO: properly handle validation
			return;
		}
		if (!formData.token) {
			window.alert("Client token should not be empty!"); // TODO: properly handle validation
			return;
		}
		setIsSubmitting(true);
		try {
			if (client) {
				await updateClient(client.id, formData.name, formData.token);
			} else {
				await registerClient(formData.name, formData.token);
			}
			setIsSubmitting(false);
			onDone();
		} catch (error) {
			setIsSubmitting(false);
			window.alert(error);
		}
	};

	const generateToken = () => {
		setFormData({
			...formData,
			token: v4(),
		});
	};

	return (
		<div className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 shadow">
			<form className="space-y-4" onSubmit={handleFormSubmit}>
				<input type="text" id="id" name="id" value={formData.id} className="hidden" readOnly />
				<InputTextLabeled
					label={"Name"}
					name={"name"}
					value={formData.name}
					placeholder={"Android app"}
					onChange={handleChange}
					className="flex flex-row items-baseline"
					disabled={isSubmitting}
				/>

				<div className="flex flex-row justify-between">
					<InputTextLabeled
						label={"Token"}
						name={"token"}
						value={formData.token}
						placeholder={"8473ef23-dec6-48d5-a7ba-a4a6589d4ae5"}
						onChange={handleChange}
						className="flex flex-row items-baseline flex-1"
						disabled={isSubmitting}
					/>
					<button
						type="button"
						className="flex rounded px-4 py-2 ml-2 font-bold text-white hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={generateToken}
						disabled={isSubmitting}
					>
						generate
					</button>
				</div>
				<div className="flex flex-row justify-evenly">
					<button
						type="reset"
						className="flex rounded px-4 py-2 font-bold text-white hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					{client && (
						<button
							type="reset"
							className="flex rounded px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
							disabled={isSubmitting}
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						className="flex rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}