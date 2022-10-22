import { componentDidAppear, componentWillDisappear } from 'inferno-animation';

type TInfernoFnCompProps = {
  value?: object;
  onComponentDidAppear?: (dom: HTMLElement, props) => void;
  onComponentWillDisappear?: (dom: HTMLElement, props: any, callback: Function) => void;
  animation: string;
}

export default function Container({id, name, isStaged, data}) {
  return <div className="poc-stinger">
    {isStaged && <Background 
      onComponentDidAppear={componentDidAppear as any}
      onComponentWillDisappear={componentWillDisappear as any}
      animation="Background" />}
    {isStaged && <Title
      value={data}
      onComponentDidAppear={componentDidAppear as any}
      onComponentWillDisappear={componentWillDisappear as any}
      animation="Title" />}
  </div>
}

function Title({value}: TInfernoFnCompProps) {
  return (
    <div className="Title">
      <div className="inner">
        <span className="name">{value['name']}</span>
        <span className="title">{value['title']}</span>
      </div>
    </div>
  )
}

function Background({} : TInfernoFnCompProps) {
  return (
    <div className="Background">
      <div className="Plate"></div>
      <div className="Bar_1"></div>
      <div className="Bar_2"></div>
      <div className="Bar_3"></div>
      <div className="Bar_4"></div>
      <div className="Bar_5"></div>
    </div>
  )
}