interface HeaderTitleProps {
    title: string,
    subtitle: string
}

export default ({ title, subtitle }: HeaderTitleProps) => {
    return (
        <h1 className="my-4">{title} <small className="h5 text-muted">{subtitle}</small></h1>
    ) 
 }
