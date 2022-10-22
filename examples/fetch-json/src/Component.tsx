import { Component, Inferno } from 'inferno';
import { componentDidAppear, componentWillDisappear } from 'inferno-animation';
import { name } from './streamix_package.json';

const isProd = process.env.NODE_ENV === 'production';

type TCommentContainerProps = {
  endpointUri: string;
  duration: number,
  fetchOne: boolean,
}

// https://dummyjson.com/docs/comments
type TDummyJsonResponse = {
  body: string,
  postId: number,
  user: {
    id: number,
    username: string,
  }
}


class CommentContainer extends Component<TCommentContainerProps> {
  _timeOut?: any;
  state = {
    text: undefined,
    userName: undefined,
    id: undefined,
    show: false
  }

  constructor(props) {
    super(props);
    this._doHideComment = this._doHideComment.bind(this);
  }

  componentDidUpdate(prevProps): void {
    if (this.props.fetchOne && !prevProps.fetchOne) {
      this._fetchComment()
    }
  }

  _doHideComment() {
    this._timeOut = null;
    this.setState({
      show: false,
    })
  }

  async _fetchComment() {
    const randomId = Math.round(Math.random() * 100).toString();
    const endpoint = this.props.endpointUri.replace('$id', randomId);
    const res = await fetch(endpoint);
    console.log(endpoint);
    if (res.ok) {
      const data: TDummyJsonResponse = await res.json();
      this.setState({
        id: data.postId,
        text: data.body,
        userName: data.user.username,
        show: true
      });

      if (this._timeOut) {
        clearTimeout(this._timeOut);
      }

      this._timeOut = setTimeout(this._doHideComment, this.props.duration);
    }
  }

  render() {
    if (!this.state.show) return null;

    // NOTE: setting key lets Inferno differentiate between entire comments.
    // Without it text and user name will be updated for the current comment.
    // This allows the entire comment to be animated when it changes.
    return (
      <Comment
        key={`comment-${this.state.id}`}
        userName={this.state.userName}
        text={this.state.text}
        onComponentDidAppear={componentDidAppear as any}
        onComponentWillDisappear={componentWillDisappear as any}
        animation="CommentAnim" />
    )
  }
}

function Comment({ userName, text, ...other }) {
  return (
    <div className="Comment">
      <h2>{`@${userName}`}</h2>
      <p>{text}</p>
    </div>
  )
}


export default function Container({ id, isNext, isStaged, data }) {
  const { endpointUri, duration, fetchOne } = data;

  return <div className={name}>
    {isStaged && <CommentContainer endpointUri={endpointUri} duration={parseInt(duration)} fetchOne={fetchOne} />}
  </div>
}
