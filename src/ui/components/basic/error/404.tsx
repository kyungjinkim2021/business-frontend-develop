/* eslint-disable react/destructuring-assignment */
import { Component } from "react";
import Router from "next/router";
import { Result } from "antd";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line react/sort-comp
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  handleButtonClick = () => {
    Router.push("/list");
    Router.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative" style={{ margin: "60px auto" }}>
          <div>
            <Result
              style={{}}
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<a href="http://www.reware.co.kr">잘못된 경로입니다</a>}
            />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
