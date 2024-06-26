import { Issue } from "@/types";
import IssueChildrenList from "./IssueChildrenList";

type Props = {
	issue: Issue;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
};

export default function IssueCompact(props: Props) {
	return (
		<div
			className={` group flex flex-col px-3 py-1 ${
				props.isSelected ? "bg-blue-900" : "bg-gray-800 hover:bg-gray-700"
			} rounded-lg shadow hover:cursor-pointer ${props.className}`}
			onClick={props.onClick}
		>
			<div className={`flex flex-row items-center justify-between`}>
				<h3 className={"text-lg"}>{props.issue.title}</h3>
				{/* <div className="flex flex-col pl-2 items-end self-start">
					<span className={"text-xs text-gray-500"}>{props.issue.status}</span>
					<span className={"text-xs text-gray-500"}>{props.issue.type}</span>
				</div> */}
			</div>
			{props.issue.description && (
				<div className="text-mg truncate text-gray-400">{props.issue.description}</div>
			)}
			{props.issue.parentId === null && <IssueChildrenList parentId={props.issue.id} onClick={() => {}} />}
		</div>
	);
}
