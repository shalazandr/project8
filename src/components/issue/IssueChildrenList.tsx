import IssueCompact from "./IssueCompact";
import LoadingSpinner from "../common/LoadingSpinner";
import { useIssueChildren } from "@/tanstack_query/hooks/useIssueChildren";
import { Issue } from "@/types";

type Props = {
	parentId: number;
	onClick: (children: Issue) => void;
};

export default function IssueChildrenList(props: Props) {
	const { data, isFetching, isError } = useIssueChildren(props.parentId);

	if (isFetching) {
		return <LoadingSpinner className="my-2 flex h-8 justify-center" />;
	}

	if (isError) {
		return <div className="rounded bg-red-700 p-2 text-lg text-white">Failed to fetch issue children</div>;
	}

	return (
		<div className="ml-2">
			{data &&
				data.map((children) => (
					<div key={children.id}>
						<div className=" mx-3 border-b border-gray-600"></div>
						<IssueCompact
							issue={children}
							isSelected={false}
							onClick={() => props.onClick(children)}
							className=" group-hover:bg-gray-700"
						/>
					</div>
				))}
		</div>
	);
}
