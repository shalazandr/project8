import { Vault } from "@/database/dao/vaultsDAO";

type Props = {
	vault: Vault;
	onEdit: () => void;
	className?: string;
};

export default function VaultDetailsPanel(props: Props) {
	return (
		<div
			className={`flex flex-col w-full items-center justify-between rounded-lg px-3 py-2 text-white transition duration-75 bg-gray-800`}
		>
			<div className="flex flex-row items-center justify-between w-full">
				<h2>{props.vault.name}</h2>
				{props.vault.url && <div className="text-mg truncate text-gray-400">{props.vault.url}</div>}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					fill="currentColor"
					aria-hidden="true"
					className="h-4 w-4 flex-shrink-0 text-gray-500 transition duration-75 hover:cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
					onClick={props.onEdit}
				>
					<path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
				</svg>
			</div>
		</div>
	);
}
