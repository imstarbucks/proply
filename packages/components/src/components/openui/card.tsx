import { defineComponent } from "@openuidev/react-lang";
import { z } from "zod";

const CardPropsScheme = z.object({
	title: z.string().min(1),
	tags: z.array(z.string()),
	address: z.string().min(1),
	numberOfBedroom: z.string(),
	numberOfBathroom: z.string(),
	price: z.number(),
});

type CardProps = z.infer<typeof CardPropsScheme>;

export const Card = defineComponent({
	name: "Card",
	description: "Display Property details",
	props: CardPropsScheme,
	component: ({ props }) => <CardComp {...props} />,
});

export const CardComp = (props: CardProps) => {
  return (
    <div className="">
			<div className="">{props.title}</div>
		</div>
	);
};
