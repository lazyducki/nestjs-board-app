import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @OneToMany(type => Board, board => board.user, {eager: true})
  //첫 번째 인자로 자식 엔티티 클래스를, 두 번째 인자로 자식 엔티티에서 부모 엔티티에 접근하는 속성(보통 함수 형태)을 전달합니다.
  @OneToMany(() => Board, (board) => board.user)
  boads: Board[];
}
