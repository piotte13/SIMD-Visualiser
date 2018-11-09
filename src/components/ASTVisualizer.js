import React, {Component} from 'react';
import * as _ from "lodash";
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css';
import '../css/ASTVisualizer.css'

let getChildren = (node) => {

    switch (node.type) {

        case 'Program':
            return node.body;

        case 'VariableDeclaration':
            return node.declarations;

        case 'VariableDeclarator':
            return node.init ? [node.id, node.init] : [node.id];

        case 'ExpressionStatement':
            return [node.expression];

        case 'BinaryExpression':
            return [node.left, node.right];

        case 'AssignmentExpression':
            return [node.left, node.right];

        case 'CallExpression':
            return [node.callee, {type: 'arguments', arguments: node.arguments}];

        case 'arguments':
            return node.arguments;

        case 'MemberExpression':
            return [node.object, node.property];

        case 'NewExpression':
            return node.arguments;

        case 'ObjectExpression':
            return node.properties;

        case 'Property':
            return [node.key, node.value];

        case 'FunctionDeclaration':
            return [node.body];

        case 'FunctionExpression':
            return [node.body];

        case 'BlockStatement':
            return node.body;

        case 'ReturnStatement':
            return node.argument ? [node.argument] : [];

        case 'UnaryExpression':
            return [node.argument];

        case 'IfStatement':
            return [node.test, node.consequent];

        case 'ConditionalExpression':
            return [node.test, node.consequent, node.alternate];

        default:
            return [];
    }
};

let getLabel = (node) => {

    switch (node.type) {

        case 'Identifier':
            return node.name;

        case 'Literal':
            return node.raw;

        case 'UnaryExpression':
            return node.operator;

        case 'BinaryExpression':
            return node.operator;

        case 'AssignmentExpression':
            return node.operator;

        case 'FunctionDeclaration':
            var params1 = _.map(node.params, 'name').join(',');
            return 'function ' + (!(!(node.id && node.id.name) && !'')) + '(' + params1 + ')';

        case 'FunctionExpression':
            var params2 = _.map(node.params, 'name').join(',');
            return 'function ' + (!(!(node.id && node.id.name) && !'')) + '(' + params2 + ')';

        default:
            return node.type;
    }
};

class AstVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
        };

    }

    componentDidMount() {
        this.setState({treeData: this.buildTree(this.props.ast)})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({treeData: this.buildTree(nextProps.ast)})
    }

    recursiveBuilder = (node) => {
        let children = getChildren(node);
        let tree = [];
        if (children === [])
            return children;
        children.forEach((child) => {
            tree.push({
                title: getLabel(child),
                children: this.recursiveBuilder(child),
                expanded: true,
                type: child.type,
                start: child.start,
                end: child.end
            });
        });
        return tree
    };

    buildTree = (ast) => {
        let tree = [];
        tree.push({
            title: getLabel(ast),
            children: this.recursiveBuilder(ast),
            expanded: true,
            type: ast.type,
            start: ast.start,
            end: ast.end
        });
        return tree
    };

    highlightCode = (start, end) => {
        let codeEditor = this.props.cm.editor.doc;
        const fromIndex = codeEditor.posFromIndex(start);
        const toIndex = codeEditor.posFromIndex(end);
        codeEditor.markText(fromIndex, toIndex, {
            className: 'highlighted-code'
        });
    };

    clearHighlightedCode = () => {
        this.props.cm.editor.doc.getAllMarks().forEach((m) => {
            m.clear()
        })
    };

    render() {
        return (
            <SortableTree
                treeData={this.state.treeData}
                onChange={treeData => this.setState({treeData})}
                canDrag={false}
                generateNodeProps={({node}) => {
                    return {
                        className: node.type,
                        onMouseEnter: () => this.highlightCode(node.start, node.end),
                        onMouseLeave: () => this.clearHighlightedCode()
                    };
                }}
            />
        );
    }
}

export default AstVisualizer;