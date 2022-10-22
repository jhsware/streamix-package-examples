import { componentDidAppear, componentWillDisappear } from 'inferno-animation';

type TInfernoFnCompProps = {
  value: object;
  onComponentDidAppear?: (dom: HTMLElement, props) => void;
  onComponentWillDisappear?: (dom: HTMLElement, props: any, callback: Function) => void;
  animation: string;
}

function NameTag({value, animation}: TInfernoFnCompProps) {
  return (
    <div className="NameTag">
      <div className="inner">
        <span className="name">{value['name']}</span>
        <span className="title">{value['title']}</span>
      </div>
    </div>
  )
}

export default function Container({id, name, isStaged, data}) {
  return <div className="name-tag">
    {isStaged && <NameTag
      value={data}
      onComponentDidAppear={componentDidAppear as any}
      onComponentWillDisappear={componentWillDisappear as any}
      animation="NameTag" />}
  </div>
}
