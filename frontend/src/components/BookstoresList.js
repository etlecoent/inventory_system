import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

export default function BookstoresList(props) {
  const { handleClick, bookstores, classes, bookstoreId } = props;

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {bookstores.map((bookstore, index) => (
          <ListItem
            button
            selected={bookstore.id === bookstoreId}
            key={bookstore.id}
            onClick={() => handleClick(bookstore.id)}>
            <ListItemText primary={`${bookstore.id} - ${bookstore.name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
